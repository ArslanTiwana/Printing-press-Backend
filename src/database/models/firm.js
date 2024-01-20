"use strict";
const { Model } = require("sequelize");
const moment =require('moment')

module.exports = (sequelize, DataTypes) => {
  class Firm extends Model {

    static associate(models) {
    }
  }
  Firm.init(
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
      modelName: "Firm",
      tableName: "Firm",
      timestamps:false
    },
  );
  return Firm;
};
