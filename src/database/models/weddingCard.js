"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WeddingCard extends Model {

    static associate(models) {
      models.Order.hasMany(models.WeddingCard, {
        foreignKey: "orderId",
      });
      models.User.hasMany(models.WeddingCard, {
        foreignKey: "completedBy",
      });
      // models.Firm.hasMany(models.WeddingCard, {
      //   foreignKey: "firm_id",
      // });
       // models.FirmCard.hasMany(models.WeddingCard, {
      //   foreignKey: "firm_card_id",
      // });
    }
  }
  WeddingCard.init(
    {
      cardName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      color: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      printingColor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      baraatQuantity: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      mehndiQuantity: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: true,
      },
      walimaQuantity: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
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
      modelName: "WeddingCard",
      tableName: "WeddingCard",
    },
  );
  return WeddingCard;
};
