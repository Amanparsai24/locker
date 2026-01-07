import { User } from "./user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.js";
export const signupUser = async (name, email, hashedPassword) => {
    const user = await User.create({ name, email, password: hashedPassword });
    return user;
};
export const findUserByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};
export const findUserById = async (id) => {
    return await User.findByPk(id, { attributes: { exclude: ['password'] } });
};
export const generateToken = async (user) => {
    const token = jwt.sign({ id: user.id, role: user.role }, ENV.JWT_SECRET, { expiresIn: "1d" });
    return token;
};
