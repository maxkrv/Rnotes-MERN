import express from "express";
import { DBPassword, PORT } from "./config.js";
import mongoose from "mongoose";
import authRoute from "./routes/authRoute.js";

const app = express();
app.use(express.json());
app.use("/auth", authRoute);

const start = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://admin:${DBPassword}@cluster0.t5kix.mongodb.net/?retryWrites=true&w=majority`
		);
		app.listen(PORT, () => console.log(`server works on ${PORT}`));
	} catch (e) {
		console.log(e);
	}
};

start();
