import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};

	return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

export default class authController {
	static async registration(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors });
			}

			const { email, password } = req.body;
			const candidate = await User.findOne({ email });

			if (candidate) {
				return res
					.status(400)
					.json({ message: "This email already exist" });
			}

			const hashedPassword = bcrypt.hashSync(password, 7);
			const user = new User({ email, password: hashedPassword });
			await user.save();
			return res.json({ message: "Registration completed!" });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Registration error" });
		}
	}

	static async login(req, res) {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: errors });
			}

			const { email, password } = req.body;
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}
			const validPassword = bcrypt.compareSync(password, user.password);

			if (!validPassword) {
				return res.status(400).json({ message: "Wrong password" });
			}

			const token = generateAccessToken(user._id);

			return res.json({ token });
		} catch (e) {
			console.log(e);
		}
	}
}
