"use strict";
const { Model } = require("sequelize");
const moment =require('moment')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    static associate(models) {
      models.Client.hasMany(models.Order, {
        foreignKey: "clientId",
      });
      models.User.hasMany(models.Order, {
        foreignKey: "createdBy",
      });
    }
  }
  Order.init(
    {
      expectedDeliveryDate: {
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
      modelName: "Order",
      tableName: "Order",
      timestamps:false
    },
  );
  return Order;
};
