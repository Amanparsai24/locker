import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import * as UserService from "./user.service.js";
import Helper from "../../utils/helper.js";
import { User, UserRole } from "./user.model.js";


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Your signup logic here   
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            throw new ApiError("All fields are required", 400);
        }
        const hashPassword = await bcrypt.hash(password, 10);
        // check if user already exists
        const existingUser = await UserService.findUserByEmail(email);
        if (existingUser) {
            throw new ApiError("User already exists", 400);
        }
        // Save user to database (pseudo code)
        const user = await UserService.signupUser(name, email, hashPassword);
        const safeUser = Helper.sanitizeUser(user);
        res.status(201).json(ApiResponse.success("User registered successfully", safeUser));

    } catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
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
    } catch (error) {
        next(error);
    }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as any).user.id; // auth middleware se aya

        const user = await UserService.findUserById(userId);

        if (!user) {
            throw new ApiError("User not found", 404);
        }
        const safeUser = Helper.sanitizeUser(user);
        res.status(200).json(ApiResponse.success("User profile fetched successfully", safeUser));
    } catch (error) {
        next(error);
    }
};


export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { name, email, password, role, phone, photo } = req.body;
        // 🔹 basic validation
        if (!name) throw new ApiError("Name is required", 400);
        if (!email) throw new ApiError("Email is required", 400);
        if (!password) throw new ApiError("Password is required", 400);
        if (!phone) throw new ApiError("Phone is required", 400);
        if (role && !Object.values(UserRole).includes(role)) {
            throw new ApiError("Invalid role value", 400);
        }
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await UserService.createUser({
            name,
            email,
            password: hashPassword,
            role,
            phone,
            photo, // sirf filename / path
        });

        const safeUser = Helper.sanitizeUser(user);
        res.status(200).json(ApiResponse.success("User added successfully", safeUser));

    } catch (error) {
        next(error);
    }
}

export const uploadUserImage = (req: Request, res: Response, next: NextFunction) => {
    try {

        if (!req.file) {
            return res.status(400).json({
                status: 400,
                message: "File required",
            });
        }

        const result = {
            filename: req.file.filename,
            path: `/uploads/users/${req.file.filename}`,
        };
        res.status(200).json(ApiResponse.success("User profile uploaded successfully", result));
    } catch (error) {
        next(error);
    }
};

export const getUserListold = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Step 1: Logged-in user check (JWT se)
        const userId = (req as any).user?.id;
        if (!userId) throw new ApiError("Unauthorized access", 401);

        // Step 5: DB call
        // const data = await UserService.getUserList({
        //     page: Number(req.query.page),
        //     limit: Number(req.query.limit),
        //     search: req.query.search as string,
        // });

        // Step 6: Response
        // res.status(200).json({
        //     success: true,
        //     message: "User list fetched successfully",
        //     data,
        // });

    } catch (error) {
        next(error);
    }
};

export const getUserList = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await UserService.getUserListService({
            limit: Number(req.query.limit),
            offset: Number(req.query.offset),
            sort: req.query.sort as string,
            order: req.query.order as "ASC" | "DESC",
            keyword: req.query.keyword as string,
            startDate: req.query.startDate as string,
            endDate: req.query.endDate as string,
        });

        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
}