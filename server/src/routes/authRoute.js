import { Router } from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";

const authRoute = new Router();

authRoute.post(
	"/registration",
	[
		check("email", "can't be empty").notEmpty(),
		check("email", "invalid email").isEmail(),
		check("password", "can't be empty").notEmpty(),
		check("password", "password must be from 6 to 20 characters").isLength({
			min: 6,
			max: 20,
		}),
	],
	authController.registration
);
authRoute.post(
	"/login",
	[
		check("email", "can't be empty").notEmpty(),
		check("email", "invalid email").isEmail(),
		check("password", "can't be empty").notEmpty(),
	],
	authController.login
);

export default authRoute;
