"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ColorPrint extends Model {

    static associate(models) {
      models.Order.hasMany(models.ColorPrint, {
        foreignKey: "orderId",
      });
      models.User.hasMany(models.ColorPrint, {
        foreignKey: "completedBy",
      });
    }
  }
  ColorPrint.init(
    {
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      paperType: {
        type: DataTypes.STRING,
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
    },
    {
      sequelize,
      modelName: "ColorPrint",
      tableName: "ColorPrint",
    },
  );
  return ColorPrint;
};
