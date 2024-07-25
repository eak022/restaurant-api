const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

//verify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    // 1st verify
    return res.status(403).send({ message: "No token provided" });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).sen({ massage: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

//isAdmin
isAdmin = (req, res, next) =>{
    User.findByPk(req.userId).then((user)=>{
        user.getRoles().then((roles)=>{
            for(let i = 0; i < roles.lenght; i++ ){
                if(roles[i].name === "admin"){
                    next();
                    return
                }
            }
            return res.status(401).then({massage:"Unauthorized access, require Admin Role"})
        })
    });
}

//isMod
isMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.lenght; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }
      return res
        .status(401)
        .then({ massage: "Unauthorized access, require moderator Role" });
    });
  });
};

//isAdminOrmod

isModOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.lenght; i++) {
        if (roles[i].name === "moderator" || roles[i].name === "admin") {
          next();
          return;
        }
      }
      return res.status(401).then({
        massage: "Unauthorized access, require Admin Role or moderator Role",
      });
    });
  });
};


const authJwt = {
    verifyToken,
    isAdmin,
    isMod,
    isModOrAdmin
}
module.exports = authJwt