"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class FirmCard extends Model {

    static associate(models) {
      models.Firm.hasMany(models.FirmCard, {
        foreignKey: "firmId",
      });
    }
  }
  FirmCard.init(
    {
      name: {
        type: DataTypes.STRING,
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
      modelName: "FirmCard",
      tableName: "FirmCard",
      timestamps:false
    },
  );
  return FirmCard;
};
