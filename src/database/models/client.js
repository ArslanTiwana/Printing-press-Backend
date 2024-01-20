"use strict";
const { Model } = require("sequelize");
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
      },
    },
    {
      sequelize,
      modelName: "Client",
      tableName: "Client",
    },
  );
  return Client;
};
