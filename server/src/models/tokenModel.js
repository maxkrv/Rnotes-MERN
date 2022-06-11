import mongoose from "mongoose";

const TokenModel = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
	refreshToken: { type: String, required: true },
});

export default mongoose.model("Token", TokenModel);
