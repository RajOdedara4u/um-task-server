import { z } from "zod";

const registerSchema = z.object({
  name: z
    .string({ message: "Name Required" })
    .trim()
    .min(3, { message: "name Required at least 3 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  email: z
    .string({ message: "Email Required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(5, { message: "email Required at least 5 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  password: z
    .string({ message: "Password Required" })
    .trim()
    .min(8, { message: "password Required at least 8 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  address: z.string().min(1, "Address is required"), // Ensure address is a non-empty string

  pincode: z
    .string({ message: "pincode Required" })
    .trim()
    .min(6, { message: "pincode Required at least 6 characters" })
    .max(6, { message: "pincode 6 characters allowed" }),
});

const loginSchema = z.object({
  email: z
    .string({ message: "Email Required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Required at least 5 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  password: z
    .string({ message: "Password Required" })
    .trim()
    .min(8, { message: "Password Contain at least 8 characters" })
    .max(255, { message: "Max 255 characters allowed" }),
});

const updateprofileschema = z.object({
  name: z
    .string({ message: "Name Required" })
    .trim()
    .min(3, { message: "name Required at least 3 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  email: z
    .string({ message: "Email Required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(5, { message: "email Required at least 5 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  password: z
    .string({ message: "Password Required" })
    .trim()
    .min(8, { message: "password Required at least 8 characters" })
    .max(255, { message: "Max 255 characters allowed" }),

  address: z.string().min(1, "Address is required"), // Ensure address is a non-empty string

  pincode: z
    .string({ message: "pincode Required" })
    .trim()
    .min(6, { message: "pincode Required at least 6 characters" })
    .max(6, { message: "pincode 6 characters allowed" }),
});

export { registerSchema, loginSchema, updateprofileschema };
