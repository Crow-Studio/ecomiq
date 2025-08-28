import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import {
  CF_IMAGES_API,
  ImageUploadResult,
  ImageVariants,
  R2_BUCKET,
  r2Client,
} from "./r2-client";

/**
 * Strategy 1: R2 Only with CF Images On-Demand
 * - Upload only to R2
 * - Use CF Images URL patterns to serve from R2 with transformations
 */
export async function uploadToR2WithCFTransforms(
  file: File | Buffer,
  fileName: string,
  folder: string = "products",
): Promise<ImageUploadResult> {
  const buffer = file instanceof File ? Buffer.from(await file.arrayBuffer()) : file;
  const timestamp = Date.now();
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  const r2Key = `${folder}/${timestamp}-${baseName}`;

  try {
    // Upload only to R2
    await uploadToR2(buffer, r2Key, getContentType(fileName));

    const r2Url = `${process.env.R2_PUBLIC_URL}/${r2Key}`;

    return {
      id: r2Key,
      r2Key,
      originalUrl: r2Url,
      variants: generateR2WithCFTransformVariants(r2Url),
    };
  } catch (error) {
    console.error("R2 upload failed:", error);
    throw new Error("Failed to upload image");
  }
}

/**
 * Upload to R2 Storage
 */
export async function uploadToR2(
  buffer: Buffer,
  key: string,
  contentType: string,
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: "public, max-age=31536000",
  });

  await r2Client.send(command);
}

/**
 * Generate Cloudflare Images variant URLs
 * Uses CF Images built-in variants
 */
export function generateCloudflareImageVariants(imageId: string): ImageVariants {
  const baseUrl = `https://imagedelivery.net/${process.env.CLOUDFLARE_IMAGES_HASH}/${imageId}`;

  return {
    thumbnail: `${baseUrl}/w=150,h=150,fit=cover,f=webp`,
    small: `${baseUrl}/w=400,h=400,fit=cover,f=webp`,
    medium: `${baseUrl}/w=800,h=800,fit=cover,f=webp`,
    large: `${baseUrl}/w=1200,fit=scale-down,f=webp`,
    original: `${baseUrl}/public`,
  };
}

/**
 * Generate R2 URLs with CF Images transformations
 * Uses CF Images transform API with R2 as source
 */
export function generateR2WithCFTransformVariants(r2Url: string): ImageVariants {
  const encodeUrl = encodeURIComponent(r2Url);
  const transformBase = `https://images.cloudflare.com/transform/v1/resize`;

  return {
    thumbnail: `${transformBase}/w=150,h=150,fit=cover,f=webp/${encodeUrl}`,
    small: `${transformBase}/w=400,h=400,fit=cover,f=webp/${encodeUrl}`,
    medium: `${transformBase}/w=800,h=800,fit=cover,f=webp/${encodeUrl}`,
    large: `${transformBase}/w=1200,fit=scale-down,f=webp/${encodeUrl}`,
    original: r2Url,
  };
}

/**
 * Delete image from both R2 and Cloudflare Images
 */
export async function deleteImage(imageData: {
  r2Key?: string;
  cfImageId?: string;
}): Promise<void> {
  const deletePromises: Promise<unknown>[] = [];

  // Delete from R2
  if (imageData.r2Key) {
    const r2DeleteCommand = new DeleteObjectCommand({
      Bucket: R2_BUCKET,
      Key: imageData.r2Key,
    });
    deletePromises.push(r2Client.send(r2DeleteCommand));
  }

  // Delete from Cloudflare Images
  if (imageData.cfImageId) {
    const cfDeletePromise = fetch(`${CF_IMAGES_API}/${imageData.cfImageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_TOKEN}`,
      },
    });
    deletePromises.push(cfDeletePromise);
  }

  await Promise.allSettled(deletePromises);
}

/**
 * Get optimal serving strategy based on usage patterns
 */
export function getOptimalImageUrl(
  variants: ImageVariants,
  size: "thumbnail" | "small" | "medium" | "large" = "medium",
): string {
  // For high-traffic images, use CF Images (better caching, CDN)
  // For archival/backup, use R2 direct URLs
  return variants[size];
}

export function getContentType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  return contentTypes[extension || "jpg"] || "image/jpeg";
}

export function chooseImageStrategy(
  monthlyImages: number,
  avgFileSize: number,
  trafficLevel: "low" | "medium" | "high",
): string {
  const monthlyStorage = (monthlyImages * avgFileSize) / (1024 * 1024 * 1024); // GB

  if (trafficLevel === "low" && monthlyStorage < 10) {
    return "r2-only";
  }

  if (trafficLevel === "high" || monthlyStorage > 50) {
    return "r2-cf-transforms"; // Most cost effective for high volume
  }

  return "r2-cf-hybrid"; // Best balance for most cases
}
