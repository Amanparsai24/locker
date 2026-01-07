import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.js";

export const signupUser = async (name: string, email: string, hashedPassword: string) => {
    const user = await User.create({ name, email, password: hashedPassword } as any);
    return user;
}

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
}

export const findUserById = async (id: string) => {
    return await User.findByPk(id, { attributes: { exclude: ['password'] } });
}

export const generateToken = async (user: any) => {
    const token = jwt.sign({ id: user.id, role: user.role }, ENV.JWT_SECRET, { expiresIn: "1d" });
    return token;
}

