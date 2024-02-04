"use strict";
const { Model } = require("sequelize");
const moment =require('moment')
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {

    static associate(models) {
      models.JobCard.hasMany(models.Invoice, {
        foreignKey: "jobCardId",
      });
      models.User.hasMany(models.Invoice, {
        foreignKey: "createdBy",
      });
      models.Invoice.belongsTo(models.JobCard, {
        foreignKey: "jobCardId",
      });
    }
  }
  Invoice.init(
    {
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:"Pending"
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
