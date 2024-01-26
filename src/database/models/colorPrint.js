"use strict";
const { Model } = require("sequelize");
const moment =require('moment')
module.exports = (sequelize, DataTypes) => {
  class ColorPrint extends Model {

    static associate(models) {
      models.Order.hasMany(models.ColorPrint, {
        foreignKey: "orderId",
        onDelete: 'CASCADE',
      });
      models.Invoice.hasMany(models.ColorPrint, {
        foreignKey: "invoiceId",
      });
      models.ColorPrint.belongsTo(models.Invoice, {
        foreignKey: "invoiceId",
      });
      models.User.hasMany(models.ColorPrint, {
        foreignKey: "completedBy",
      });
    }
  }
  ColorPrint.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      extra: {
        type: DataTypes.INTEGER,
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
      modelName: "ColorPrint",
      tableName: "ColorPrint",
      timestamps:false
    },
  );
  return ColorPrint;
};
