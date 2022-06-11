import UserModel from "../models/userModel.js";
import UserDto from "../dto/UserDto.js";
import TokenService from "./TokenService.js";
import bcrypt from "bcryptjs";
import APIError from "../exceptions/APIError.js";

class UserService {
	static async registration(email, password) {
		const candidate = await UserModel.findOne({ email });
		if (candidate) {
			throw APIError.BadRequest("This email already exist");
		}
		const hashedPassword = await bcrypt.hash(password, 6);

		const user = await UserModel.create({
			email,
			password: hashedPassword,
		});

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });
		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	static async login(email, password) {
		const user = await UserModel.findOne({ email });
		if (!user) {
			throw APIError.BadRequest("User not found");
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw APIError.BadRequest("Wrong password");
		}

		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });

		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}

	static async logout(refreshToken) {
		return await TokenService.removeToken(refreshToken);
	}

	static async refresh(refreshToken) {
		if (!refreshToken) {
			throw APIError.UnauthorizedError();
		}

		const userData = TokenService.validateRefreshToken(refreshToken);
		const tokenFromDB = await TokenService.findToken(refreshToken);
		if (!userData || !tokenFromDB) {
			throw APIError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = TokenService.generateTokens({ ...userDto });

		await TokenService.saveToken(userDto.id, tokens.refreshToken);

		return { ...tokens, user: userDto };
	}
}

export default UserService;
