import express from "express";
import { DBPassword, PORT } from "./config.js";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middlewares/errorMiddleware.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/auth", authRoute);
app.use(errorMiddleware);

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://admin:${DBPassword}@cluster0.t5kix.mongodb.net/?retryWrites=true&w=majority`
		);
		app.listen(PORT, () => console.log(`server works on port ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
