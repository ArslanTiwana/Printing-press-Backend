"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Panaflex extends Model {
    static associate(models) {
      models.Order.hasMany(models.Panaflex, {
        foreignKey: "orderId",
      });
      models.User.hasMany(models.Panaflex, {
        foreignKey: "completedBy",
      });
    }
  }
  Panaflex.init(
    {
      quantity: {
        type: DataTypes.BIGINT,
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
      media: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isStick: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isFolding: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isRing: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      ringQuantity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
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
      createdOn:{
        type:DataTypes.BIGINT,
        allowNull:false,
        defaultValue:moment(new Date()).unix()
      },
    },
    {
      sequelize,
      modelName: "Panaflex",
      tableName: "Panaflex",
      timestamps:false
    },
  );
  return Panaflex;
};
