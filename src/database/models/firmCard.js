"use strict";
const { Model } = require("sequelize");
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
    },
    {
      sequelize,
      modelName: "FirmCard",
      tableName: "FirmCard",
    },
  );
  return FirmCard;
};
