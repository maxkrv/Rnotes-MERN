import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT || 5000;
export const DBLogin = "admin";
export const DBPassword = "admin";
export const secretKey = "very_secret_key";
