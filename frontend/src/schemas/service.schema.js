import { z } from "zod";

export const createServiceSchema = z.object({
  category: z.string().default(""),

  name: z.string().trim().min(2).max(200).default(""),

  description: z.string().trim().max(5000).default(""),

  price: z.number().min(0).default(0),

  durationHours: z.number().min(0).default(0),

  imageFiles: z.array(z.instanceof(File)).default([]),
});