const db = require("../models");
const User = db.User;
const Role = db.Role;
const { Op } = require("sequelize");

checkDuplicateUserNameOrEmail = async (req, res, next) => {
    try {
        let user = await User.findOne({ where: { userName: req.body.userName } });
        if (user) {
            res.status(400).send({ message: "Failed! Username is already in use" });
            return;
        }

        user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            res.status(400).send({ message: "Failed! Email is already in use" });
            return;
        }

        next();
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

checkRolesExisted = async (req, res, next) => {
    if (req.body.roles) {
        try {
            const roles = await Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles,
                    },
                },
            });

            if (roles.length !== req.body.roles.length) {
                res.status(400).send({ message: "Failed! Role does not exist" });
                return;
            }
            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
        }
    } else {
        next();
    }
};

const verifySignUp = {
    checkDuplicateUserNameOrEmail,
    checkRolesExisted,
};

module.exports = verifySignUp;
