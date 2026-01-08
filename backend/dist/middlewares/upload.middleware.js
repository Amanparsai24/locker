import multer from "multer";
import path from "path";
import fs from "fs";
import { FILE_TYPES, MAX_FILE_SIZE } from "../utils/file.helper.js";
export const createUploader = ({ folder, type }) => {
    const uploadPath = `uploads/${folder}`;
    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }
    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, uploadPath),
        filename: (_req, file, cb) => {
            const ext = path.extname(file.originalname);
            cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
        },
    });
    const fileFilter = (_req, file, cb) => {
        if (!FILE_TYPES[type].includes(file.mimetype)) {
            return cb(new Error(`Invalid file type. Allowed: ${type}`));
        }
        cb(null, true);
    };
    return multer({
        storage,
        fileFilter,
        limits: { fileSize: MAX_FILE_SIZE[type] },
    });
};
