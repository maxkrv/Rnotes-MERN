import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT || 5000;
export const DBPassword = "admin";
export const clientURL = "http://localhost:3000/";
export const JWTAccessKey = "very_secret_key";
export const JWTRefreshKey = "very_secret_key";
