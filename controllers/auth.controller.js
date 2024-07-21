const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// Register
exports.signup = async (req, res) => {
    const { userName, password, email } = req.body; // เปลี่ยนจาก username เป็น userName
    if (!userName || !password || !email) {
        res.status(400).send({
            message: "Please provide all required fields"
        });
        return;
    }

    const newUser = {
        userName: userName, // เปลี่ยนจาก username เป็น userName
        password: bcrypt.hashSync(password, 8),
        email: email,
    };

    try {
        const user = await User.create(newUser);
        
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: { [Op.or]: req.body.roles },
                },
            });
            await user.setRoles(roles);
            res.send({ message: "User registered successfully!" });
        } else {
            await user.setRoles([1]);
            res.send({ message: "User registered successfully!" });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Something went wrong while registering a new user",
        });
    }
};

// Signin
exports.signin = async (req, res) => {
    const { userName, password } = req.body; // เปลี่ยนจาก username เป็น userName
    if (!userName || !password) {
        res.status(400).send({
            message: "Please provide username and password",
        });
        return;
    }

    try {
        const user = await User.findOne({ where: { userName: userName } }); // เปลี่ยนจาก username เป็น userName
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid password",
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400, // 1 day
        });

        const authorities = [];
        const roles = await user.getRoles();
        for (let i = 0; i < roles.length; i++) {
            authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
            id: user.id,
            userName: user.userName, // เปลี่ยนจาก username เป็น userName
            email: user.email,
            roles: authorities,
            accessToken: token,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message || "Something error occurred while signing in.",
        });
    }
};
