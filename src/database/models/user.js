"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      verificationCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      codeExpiry: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      isCodeVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue:false
      },   
      accessToken:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
    },
  );
  return User;
};
