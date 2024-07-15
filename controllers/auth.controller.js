const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {op} = require("sequelize")

//Register
exports.signup = async(req,res) => {
    const { userName, password, email} = req.body;
    if(!userName || !password || !email) {
        res.status(400).send({
            message:"please provide all required fields"
        });
        return;
    }

    const newUser = {
      userName: userName,
      password: bcrypt.hashSync(password, 8),
      email: email,
    };

    //save User in the database
    await User.create(newUser).then((user)=>{
        if(req.body.roles){
            Role.findAll({
              where: {
                name: { [op.or]: req.body.roles },
              },
            }).then((roles)=>{
                user.setRole(roles).then(()=>{
                    res.send({
                        massage:"User registered successfully!"
                    })
                })
            });
        }else{
            //set defautl role to user id =1
            user.setRole([1]).then(()=>{
                res.send({
                    massage: "User registered successfully!"
                });
            });
        }

    }).catch((error)=>{
        res.status(500).send({
            massage:
            error.massage || "somting error register a new user",
        });
    });
}