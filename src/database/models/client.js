"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Client extends Model {

    static associate(models) {
      // models.User.hasMany(models.Client, {
      //   foreignKey: "a_by",
      // });
    }
  }
  Client.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique:true
      },
      createdOn:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:moment(new Date()).unix()
      },
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "Client",
      timestamps:false
    },
  );
  return Client;
};
