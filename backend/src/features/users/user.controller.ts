import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import ApiResponse from "../../utils/ApiResponse.js";
import ApiError from "../../utils/ApiError.js";
import * as UserService from "./user.service.js";
import Helper from "../../utils/helper.js";
import { User, UserRole } from "./user.model.js";
import { Op } from "sequelize";

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

        const {
            limit = 10,
            offset = 0,
            sort = 'created_at',
            order = 'ASC',
            keyword = '',
            startDate = null,
            endDate = null
        } = req.query
        const parsedLimit  = Number(limit)
        const parsedOffset = Number(offset) * parsedLimit

        // Build where clause for keyword search
        let where: any = {}
        if (keyword) {
            where = {
                [Op.or]: [
                    { name: { [Op.like]: `%${keyword}%` } },
                    { code: { [Op.like]: `%${keyword}%` } },
                    { color_code: { [Op.like]: `%${keyword}%` } }
                ]
            }
        }

        // Exclude deleted lounges
        where.status = { [Op.ne]: 'DELETED' }

        // Add date range filter if provided
        if (startDate || endDate) {
            where.created_at = {}
            if (startDate && !isNaN(Date.parse(startDate as string))) {
                where.created_at[Op.gte] = new Date(startDate as string)
            }
            if (endDate && !isNaN(Date.parse(endDate as string))) {
                where.created_at[Op.lte] = new Date(endDate as string)
            }
            if (Object.keys(where.created_at).length === 0) {
                delete where.created_at
            }
        }

        const users = await User.findAndCountAll({
            where,
            limit: parsedLimit,
            offset: parsedOffset,
            order: [[sort as string, (order as string).toUpperCase() === 'ASC' ? 'ASC' : 'DESC']]
        })

        const nextOffset = parsedOffset + parsedLimit < users.count ? Number(offset) + 1 : -1

        return res.status(200).json({
            count: users.count,
            nextOffset,
            users: users.rows
        })
    } catch (error) {
        return res.status(500).json({ message: 'Failed to fetch users', error })
    }
}