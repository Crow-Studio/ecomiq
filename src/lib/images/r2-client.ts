import { S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env/server";

// R2 Client (for storage)
export const r2Client = new S3Client({
  region: "auto",
  endpoint: `https://${env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  },
});

export const R2_BUCKET = env.R2_BUCKET_NAME!;

// Cloudflare Images API
export const CF_IMAGES_API = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/images/v1`;

export interface ImageUploadResult {
  id: string;
  r2Key: string;
  cfImageId?: string;
  originalUrl: string;
  cfImageUrl?: string;
  variants: ImageVariants;
}

export interface ImageVariants {
  thumbnail: string;
  small: string;
  medium: string;
  large: string;
  original: string;
}
