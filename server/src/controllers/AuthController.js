import UserService from "../services/UserService.js";
import { validationResult } from "express-validator";
import APIError from "../exceptions/APIError.js";

class AuthController {
	static async registration(req, res, next) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return next(
					APIError.BadRequest("Validation Error", errors.array())
				);
			}

			const { email, password } = req.body;
			const userData = await UserService.registration(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body;
			const userData = await UserService.login(email, password);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}

	static async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await UserService.logout(refreshToken);

			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	static async refresh(req, res, next) {
		try {
			const { refreshToken } = req.body;
			const userData = await UserService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			return res.json(userData);
		} catch (e) {
			next(e);
		}
	}
}

export default AuthController;
