'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Type.hasMany(models.Dish)
    }
  };
  Type.init({
    type: DataTypes.STRING,
    sell: DataTypes.STRING,
    delete: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};