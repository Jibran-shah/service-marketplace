import { z } from "zod";

/**
 * Shared rules (important for scalability)
 */
const email = z.string().email("Invalid email");
const password = z.string().min(6, "Password must be at least 6 characters");
const username = z.string().min(3, "Username must be at least 3 characters");
const otp = z.string().length(6, "OTP must be 6 digits");

/**
 * LOGIN
 */
export const loginSchema = z
  .object({
    email: email.optional(),
    username: username.optional(),
    password
  })
  .refine((data) => data.email || data.username, {
    message: "Email or username required",
    path: ["email"]
  });

/**
 * REGISTER
 */
export const registerSchema = z.object({
  username,
  email,
  password
});

/**
 * FORGOT PASSWORD
 */
export const forgotPasswordSchema = z.object({
  email
});

/**
 * VERIFY RESET OTP
 */
export const verifyResetOtpSchema = z.object({
  email,
  otp
});

/**
 * RESET PASSWORD
 */
export const resetPasswordSchema = z.object({
  newPassword: password
});

/**
 * VERIFY EMAIL
 */
export const verifyEmailSchema = z.object({
  userId: z.string(),
  token: z.string()
});