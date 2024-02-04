"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class OtherJob extends Model {
    static associate(models) {
      models.JobCard.hasMany(models.OtherJob, {
        foreignKey: "jobCardId",
        onDelete: 'CASCADE'
      });
      models.User.hasMany(models.OtherJob, {
        foreignKey: "completedBy",
      });
      models.Invoice.hasMany(models.OtherJob, {
        foreignKey: "invoiceId",
      });
      models.OtherJob.belongsTo(models.Invoice, {
        foreignKey: "invoiceId",
      });
      models.User.hasMany(models.OtherJob, {
        foreignKey: "createdBy",
      });
    }
  }
  OtherJob.init(
    {
      quantity: {
        type: DataTypes.INTEGER,
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
      modelName: "OtherJob",
      tableName: "OtherJob",
      timestamps:false
    },
  );
  return OtherJob;
};
