const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize"); // Correctly importing Op

// Register
exports.signup = async (req, res) => {
    const { userName, password, email } = req.body;
    if (!userName || !password || !email) {
        res.status(400).send({
            message: "Please provide all required fields"
        });
        return;
    }

    const newUser = {
        userName: userName,
        password: bcrypt.hashSync(password, 8),
        email: email,
    };

    // Save User in the database
    try {
        const user = await User.create(newUser);
        
        if (req.body.roles) {
            const roles = await Role.findAll({
                where: {
                    name: { [Op.or]: req.body.roles },
                },
            });
            await user.setRoles(roles); // Correctly using setRoles
            res.send({
                message: "User registered successfully!"
            });
        } else {
            // Set default role to user id = 1
            await user.setRoles([1]); // Correctly using setRoles
            res.send({
                message: "User registered successfully!"
            });
        }
    } catch (error) {
        res.status(500).send({
            message: error.message || "Something went wrong while registering a new user",
        });
    }
};
