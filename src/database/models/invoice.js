"use strict";
const { Model } = require("sequelize");
const moment =require('moment')
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {

    static associate(models) {
      models.Order.hasMany(models.Invoice, {
        foreignKey: "orderId",
      });
      models.User.hasMany(models.Invoice, {
        foreignKey: "createdBy",
      });
      models.Invoice.belongsTo(models.Order, {
        foreignKey: "orderId",
      });
    }
  }
  Invoice.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"pending"
      },
      tax: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      extra: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      subtotal: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total: {
        type: DataTypes.INTEGER,
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
      modelName: "Invoice",
      tableName: "Invoice",
      timestamps:false
    },
  );
  return Invoice;
};
