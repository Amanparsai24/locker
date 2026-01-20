import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database.js";
export var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ADMIN"] = "ADMIN";
    UserRole["USER"] = "USER";
})(UserRole || (UserRole = {}));
export class User extends Model {
}
User.init({
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
}, {
    sequelize,
    tableName: "users",
    timestamps: true,
    underscored: false,
});
