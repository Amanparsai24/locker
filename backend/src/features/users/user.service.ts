import { User, UserRole } from "./user.model.js";
import jwt from "jsonwebtoken";
import { ENV } from "../../config/env.js";
import { Op } from "sequelize";

interface CreateUserInput {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    phone?: string;
    photo?: string;
    status?: number;
}

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

export const createUser = (data: CreateUserInput) => {
    return User.create({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role ?? UserRole.USER,
        phone: data.phone,
        photo: data.photo,
        status: data.status ?? 1,
    });
};

interface GetUserListInput {
    limit?: number;
    offset?: number;
    sort?: string;
    order?: "ASC" | "DESC";
    keyword?: string;
    startDate?: string | null;
    endDate?: string | null;
}

export const getUserListService = async (params: GetUserListInput) => {

    const {
        limit = 10,
        offset = 0,
        sort = "createdAt",
        order = "ASC",
        keyword = "",
        startDate = null,
        endDate = null,
    } = params;

    const parsedLimit = Number(limit);
    const parsedOffset = Number(offset) * parsedLimit;

    /* ---------------- WHERE CLAUSE ---------------- */
    const where: any = {
        status: { [Op.eq]: 1 },
        role: { [Op.ne]: "SUPER_ADMIN" },

    };

    // Keyword search
    if (keyword) {
        where[Op.or] = [
            { name: { [Op.like]: `%${keyword}%` } },
            { email: { [Op.like]: `%${keyword}%` } },
        ];
    }

    // Date range filter
    if (startDate || endDate) {
        where.createdAt = {};

        if (startDate && !isNaN(Date.parse(startDate))) {
            where.createdAt[Op.gte] = new Date(startDate);
        }

        if (endDate && !isNaN(Date.parse(endDate))) {
            where.createdAt[Op.lte] = new Date(endDate);
        }

        if (Object.keys(where.createdAt).length === 0) {
            delete where.createdAt;
        }
    }

    /* ---------------- DB QUERY ---------------- */
    const result = await User.findAndCountAll({
        where,
        limit: parsedLimit,
        offset: parsedOffset,
        order: [[sort, order === "ASC" ? "ASC" : "DESC"]],
        attributes: { exclude: ['password'] },
        // attributes: ['id', 'name'],
    });

    const nextOffset = parsedOffset + parsedLimit < result.count ? offset + 1 : -1;

    return {
        count: result.count,
        nextOffset,
        list: result.rows,
    };
};
