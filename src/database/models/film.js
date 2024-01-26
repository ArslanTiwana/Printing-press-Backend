"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Film extends Model {

    static associate(models) {
      models.Order.hasMany(models.Film, {
        foreignKey: "orderId",
        onDelete: 'CASCADE'
      });
      models.User.hasMany(models.Film, {
        foreignKey: "completedBy",
      });
      models.Invoice.hasMany(models.Film, {
        foreignKey: "invoiceId",
      });
      models.Film.belongsTo(models.Invoice, {
        foreignKey: "invoiceId",
      });
    }
  }
  Film.init(
    {
      quantity: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      color: {
        type: DataTypes.INTEGER,
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
      discount: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      extra: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      minimumRate: {
        type: DataTypes.BIGINT,
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
      modelName: "Film",
      tableName: "Film",
      timestamps:false
    },
  );
  return Film;
};
