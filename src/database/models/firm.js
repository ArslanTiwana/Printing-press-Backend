"use strict";
const { Model } = require("sequelize");
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
    },
    {
      sequelize,
      modelName: "Firm",
      tableName: "Firm",
    },
  );
  return Firm;
};
