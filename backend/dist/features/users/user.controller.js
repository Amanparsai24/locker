import bcrypt from "bcryptjs";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import * as UserService from "./user.service.js";
import Helper from "../../utils/helper.js";
export const signup = async (req, res, next) => {
    try {
        // Your signup logic here   
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError("All fields are required", 400);
        }
        const hashPassword = await bcrypt.hash(password, 6);
        // check if user already exists
        const existingUser = await UserService.findUserByEmail(email);
        if (existingUser) {
            throw new ApiError("User already exists", 400);
        }
        // Save user to database (pseudo code)
        const user = await UserService.signupUser(name, email, hashPassword);
        const safeUser = Helper.sanitizeUser(user);
        res.status(201).json(ApiResponse.success("User registered successfully", safeUser));
    }
    catch (error) {
        next(error);
    }
};
export const login = async (req, res, next) => {
    try {
        // Your login logic here
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ApiError("Email and password are required", 400);
        }
        const user = await UserService.findUserByEmail(email);
        if (!user) {
            throw new ApiError("Invalid email or password", 401);
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError("Invalid email or password", 401);
        }
        // Generate token (pseudo code)
        const token = await UserService.generateToken(user);
        const safeUser = Helper.sanitizeUser(user);
        res.status(200).json(ApiResponse.success("Login successful", safeUser, token));
    }
    catch (error) {
        next(error);
    }
};
export const getMe = async (req, res, next) => {
    try {
        const userId = req.user.id; // auth middleware se aya
        const user = await UserService.findUserById(userId);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        res.status(200).json(ApiResponse.success("User profile fetched successfully", user));
    }
    catch (error) {
        next(error);
    }
};
