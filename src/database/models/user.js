"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
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
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userType: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status:{
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"active"
      },
      accessToken:{
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdOn:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:moment(new Date()).unix()
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "User",
      timestamps:false
    },
  );
  return User;
};
