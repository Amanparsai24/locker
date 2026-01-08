import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { FILE_TYPES, MAX_FILE_SIZE } from "../utils/file.helper.js";

type UploadType = keyof typeof FILE_TYPES;

interface UploadOptions {
  folder: string;        // users | documents | videos
  type: UploadType;      // image | document | video | audio
}

export const createUploader = ({ folder, type }: UploadOptions) => {
  const uploadPath = `uploads/${folder}`;

  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req: any, _file: any, cb: (err: Error | null, path: string) => void) => cb(null, uploadPath),
    filename: (_req: any, file: any, cb: (err: Error | null, filename: string) => void) => {
      const ext = path.extname(file.originalname);
      cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
    },
  });

  const fileFilter: multer.Options["fileFilter"] = (_req: any, file: any, cb) => {
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
