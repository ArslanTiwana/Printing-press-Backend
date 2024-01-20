"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Film extends Model {

    static associate(models) {
      models.Order.hasMany(models.Film, {
        foreignKey: "orderId",
      });
      models.User.hasMany(models.Film, {
        foreignKey: "completedBy",
      });
    }
  }
  Film.init(
    {
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      color: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sizeX: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sizeY: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      minimumRate: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      rate: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"pending" 
      },
    },
    {
      sequelize,
      modelName: "Film",
      tableName: "Film",
    },
  );
  return Film;
};
