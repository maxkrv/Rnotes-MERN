import jwt from "jsonwebtoken";
import TokenModel from "../models/tokenModel.js";
import { JWTAccessKey, JWTRefreshKey } from "../config.js";

class TokenService {
	static generateTokens(payload) {
		const accessToken = jwt.sign(payload, JWTAccessKey, {
			expiresIn: "30m",
		});
		const refreshToken = jwt.sign(payload, JWTRefreshKey, {
			expiresIn: "60d",
		});
		return {
			accessToken,
			refreshToken,
		};
	}

	static validateAccessToken(token) {
		try {
			return jwt.verify(token, JWTAccessKey);
		} catch (e) {
			return null;
		}
	}

	static validateRefreshToken(token) {
		try {
			return jwt.verify(token, JWTAccessKey);
		} catch (e) {
			return null;
		}
	}

	static async saveToken(userId, refreshToken) {
		const tokenData = await TokenModel.findOne({ user: userId });
		if (tokenData) {
			tokenData.refreshToken = refreshToken;
			return tokenData.save();
		}
		return await TokenModel.create({ user: userId, refreshToken });
	}

	static async removeToken(refreshToken) {
		return await TokenModel.deleteOne({ refreshToken });
	}

	static async findToken(refreshToken) {
		return await TokenModel.findOne({ refreshToken });
	}
}

export default TokenService;
