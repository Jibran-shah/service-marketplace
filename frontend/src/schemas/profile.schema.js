import { z } from "zod";

export const createProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .max(80, "Maximum 80 characters"),

  phone: z.string().optional(),

  bio: z
    .string()
    .max(500, "Maximum 500 characters")
    .optional(),

  country: z.string().optional(),

  city: z.string().optional(),

  address: z.string().optional(),

  avatar: z.any().optional(),

  cover: z.any().optional(),
});

export const updateProfileSchema =
  createProfileSchema.partial();