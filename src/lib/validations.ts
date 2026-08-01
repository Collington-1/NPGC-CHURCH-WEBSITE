import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});
export type ContactValues = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Enter a valid email address"),
});
export type NewsletterValues = z.infer<typeof newsletterSchema>;

export const givingPurposes = [
  "Tithe",
  "Offering",
  "Project Giving",
  "Building Fund",
  "Mission Support",
  "Special Seed",
] as const;

export const giveConfirmationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  amount: z.string().min(1, "Enter the amount you gave"),
  purpose: z.enum(givingPurposes),
  reference: z.string().optional(),
  message: z.string().optional(),
});
export type GiveConfirmationValues = z.infer<typeof giveConfirmationSchema>;

export const arkvilleRegistrationSchema = z.object({
  parentName: z.string().min(2, "Please enter your full name"),
  parentPhone: z.string().min(7, "Enter a valid phone number"),
  parentEmail: z.string().email("Enter a valid email address"),
  childName: z.string().min(2, "Please enter your child's name"),
  childAge: z.string().min(1, "Enter your child's age"),
  message: z.string().optional(),
});
export type ArkvilleRegistrationValues = z.infer<typeof arkvilleRegistrationSchema>;

export const discipleshipStages = [
  { label: "New Believer", value: "new-believer" },
  { label: "Growing", value: "growing" },
  { label: "Leadership Track", value: "leadership" },
] as const;

export const discipleshipRegistrationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Enter a valid phone number"),
  stage: z.enum(["new-believer", "growing", "leadership"]),
  message: z.string().optional(),
});
export type DiscipleshipRegistrationValues = z.infer<
  typeof discipleshipRegistrationSchema
>;
