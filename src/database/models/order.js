"use strict";
const { Model } = require("sequelize");
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
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "Order",
    },
  );
  return Order;
};
