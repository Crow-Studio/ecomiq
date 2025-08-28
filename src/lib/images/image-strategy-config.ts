export interface ImageStrategy {
  name: string;
  description: string;
  costProfile: "low" | "medium" | "high";
  performance: "basic" | "good" | "excellent";
  features: string[];
  monthlyEstimate: string;
}

export const IMAGE_STRATEGIES: Record<string, ImageStrategy> = {
  "r2-only": {
    name: "R2 Only with Sharp",
    description: "Store and process images using R2 + Sharp processing",
    costProfile: "low",
    performance: "good",
    features: ["Zero egress fees", "Custom processing", "Full control"],
    monthlyEstimate: "$5-15 for 100GB + processing",
  },
  "r2-cf-hybrid": {
    name: "R2 + Cloudflare Images",
    description: "R2 for storage, CF Images for transformations",
    costProfile: "medium",
    performance: "excellent",
    features: ["Zero egress from R2", "CF Images optimizations", "Automatic WebP/AVIF"],
    monthlyEstimate: "$15-35 for 100GB + transformations",
  },
  "r2-cf-transforms": {
    name: "R2 with CF Transform API",
    description: "R2 storage with on-demand CF transformations",
    costProfile: "low",
    performance: "excellent",
    features: ["Pay per transform", "No duplicate storage", "CF global CDN"],
    monthlyEstimate: "$5-20 for 100GB + transforms",
  },
};
