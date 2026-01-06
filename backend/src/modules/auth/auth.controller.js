const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/user.model");

// REGISTER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    const hashPassword = await bcrypt.hash(password, 6);

    const user = await User.create({
        name,
        email,
        password: hashPassword,
    });

    res.json({ success: true, user });
};

// LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            success: false,
            message: "Invalid password",
        });
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    // password remove before sending
    const userData = user.toJSON();
    // userData.status = Boolean(userData.status);
    delete userData.password;


    res.json({
        success: true,
        token,
        result: userData,
    });
};

// ME CALL 
exports.me = async (req, res) => {
    try {
        const userId = req.user.id; // auth middleware se aya
        const user = await User.findByPk(userId, {
            attributes: { exclude: ["password"] }, // password exclude
        });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        // if (!req.user) {
        //     return res.status(401).json({ success: false, message: "Unauthorized" });
        // }

        // output esa jae ga 
        // 	"result": {
        //         	"id": 1,
        //         	"role": "USER",
        //         	"iat": 1767702471,   // token kab create hua
        //         	"exp": 1767788871    // token kab expire hoga
        //         }

        res.json({
            success: true,
            result: user,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};
