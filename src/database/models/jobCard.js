"use strict";
const { Model } = require("sequelize");
const moment =require('moment')
module.exports = (sequelize, DataTypes) => {
  class JobCard extends Model {

    static associate(models) {
      models.Client.hasMany(models.JobCard, {
        foreignKey: "clientId",
      });
      models.User.hasMany(models.JobCard, {
        foreignKey: "createdBy",
      });
      models.JobCard.belongsTo(models.Client, {
        foreignKey: "clientId",
      });
    }
  }
  JobCard.init(
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
      completeInvoiceCreated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      extra: {
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
      modelName: "JobCard",
      tableName: "JobCard",
      timestamps:false
    },
  );
  return JobCard;
  updatedOrderinpr
};
