"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Film extends Model {

    static associate(models) {
      models.JobCard.hasMany(models.Film, {
        foreignKey: "jobCardId",
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
      models.User.hasMany(models.Film, {
        foreignKey: "createdBy",
      });
    }
  }
  Film.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      extra: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      minimumRate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sortNo: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:"Pending" 
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
