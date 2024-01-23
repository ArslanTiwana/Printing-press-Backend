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
      DeliveryDate: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: "Invoice",
      tableName: "Invoice",
      timestamps:false
    },
  );
  return Invoice;
};
