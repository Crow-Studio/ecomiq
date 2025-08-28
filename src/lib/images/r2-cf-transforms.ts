import { generateR2WithCFTransformVariants, getContentType, uploadToR2 } from ".";
import { ImageUploadResult } from "./r2-client";

/**
 * Strategy 2: R2 Only with CF Images On-Demand
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
