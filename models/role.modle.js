const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

const Role = sequelize.define("role", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Role;