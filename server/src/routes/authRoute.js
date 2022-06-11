import { Router } from "express";
import { check } from "express-validator";
import AuthController from "../controllers/AuthController.js";

const authRoute = new Router();

authRoute.post(
	"/registration",
	[
		check("email", "Can't be empty").notEmpty(),
		check("email", "Invalid email").isEmail(),
		check("password", "Can't be empty").notEmpty(),
		check("password", "Password must be at least 6 characters").isLength({
			min: 6,
		}),
	],
	AuthController.registration
);
authRoute.post(
	"/login",
	[
		check("email", "Can't be empty").notEmpty(),
		check("email", "Invalid email").isEmail(),
		check("password", "Can't be empty").notEmpty(),
	],
	AuthController.login
);
authRoute.post("/logout", AuthController.logout);
authRoute.get("/refresh", AuthController.refresh);

export default authRoute;
