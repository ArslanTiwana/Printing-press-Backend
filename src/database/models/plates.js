"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Plates extends Model {
    static associate(models) {
      models.JobCard.hasMany(models.Plates, {
        foreignKey: "jobCardId",
        onDelete: 'CASCADE'
      });
      models.User.hasMany(models.Plates, {
        foreignKey: "completedBy",
      });
      models.Invoice.hasMany(models.Plates, {
        foreignKey: "invoiceId",
      });
      models.Plates.belongsTo(models.Invoice, {
        foreignKey: "invoiceId",
      });
      models.User.hasMany(models.JobCard, {
        foreignKey: "createdBy",
      });
    }
  }
  Plates.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      color: {
        type: DataTypes.INTEGER,
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
      modelName: "Plates",
      tableName: "Plates",
      timestamps:false
    },
  );
  return Plates;
};
