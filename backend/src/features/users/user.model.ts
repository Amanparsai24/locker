import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../../config/database.js";

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

interface UserAttributes {
  id: number;
  role: UserRole;
  name: string;
  email: string;
  password: string;
  phone?: string;
  photo?: string;
  status: number; // 0 | 1 | 2
}

interface UserCreation
  extends Optional<UserAttributes, "id" | "phone" | "photo"> {}

export class User
  extends Model<UserAttributes, UserCreation>
  implements UserAttributes
{
  declare id: number;
  declare role: UserRole;
  declare name: string;
  declare email: string;
  declare password: string;
  declare phone?: string;
  declare photo?: string;
  declare status: number;
}

User.init(
  {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },

    role: {
      type: DataTypes.ENUM(...Object.values(UserRole)),
      allowNull: false,
      defaultValue: UserRole.USER,
    },

    name: { type: DataTypes.STRING(100), allowNull: false },

    email: { type: DataTypes.STRING(150), allowNull: false, unique: true },

    password: { type: DataTypes.STRING, allowNull: false },

    phone: { type: DataTypes.STRING(20) },

    photo: { type: DataTypes.STRING },

    status: { type: DataTypes.TINYINT, allowNull: false, defaultValue: 1 },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);
