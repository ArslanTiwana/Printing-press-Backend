"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Offset extends Model {

    static associate(models) {
      models.JobCard.hasMany(models.Offset, {
        foreignKey: "jobCardId",
        onDelete: 'CASCADE'
      });
      models.User.hasMany(models.Offset, {
        foreignKey: "completedBy",
      });
      models.Invoice.hasMany(models.Offset, {
        foreignKey: "invoiceId",
      });
      models.Offset.belongsTo(models.Invoice, {
        foreignKey: "invoiceId",
      });
      models.User.hasMany(models.Offset, {
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
  Offset.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      laminationDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bindingDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      pastingDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      platesDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      printingMachineDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blockingDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blockMakingDesc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDyeCutting: {
        type: DataTypes.BOOLEAN,
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
      modelName: "Offset",
      tableName: "Offset",
      timestamps:false
    },
  );
  return Offset;
};
