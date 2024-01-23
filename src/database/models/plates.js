"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Plates extends Model {
    static associate(models) {
      models.Order.hasMany(models.Plates, {
        foreignKey: "orderId",
        onDelete: 'CASCADE'
      });
      models.User.hasMany(models.Plates, {
        foreignKey: "completedBy",
      });
    }
  }
  Plates.init(
    {
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      color: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
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
      modelName: "Plates",
      tableName: "Plates",
      timestamps:false
    },
  );
  return Plates;
};
