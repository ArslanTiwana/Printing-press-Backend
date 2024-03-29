"use strict";
const { Model } = require("sequelize");
const moment =require('moment')
module.exports = (sequelize, DataTypes) => {
  class WeddingCard extends Model {

    static associate(models) {
      models.JobCard.hasMany(models.WeddingCard, {
        foreignKey: "jobCardId",
        onDelete: 'CASCADE'
      });
      models.User.hasMany(models.WeddingCard, {
        foreignKey: "completedBy",
      });
      models.Invoice.hasMany(models.WeddingCard, {
        foreignKey: "invoiceId",
      });
      models.WeddingCard.belongsTo(models.Invoice, {
        foreignKey: "invoiceId",
      });
      models.User.hasMany(models.WeddingCard, {
        foreignKey: "createdBy",
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
        type: DataTypes.INTEGER,
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
      sortNo: {
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
      modelName: "WeddingCard",
      tableName: "WeddingCard",
      timestamps:false
    },
  );
  return WeddingCard;
};
