'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dish extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Dish.belongsTo(models.Type)
    }
  };
  Dish.init({
    name: DataTypes.STRING,
    sell: DataTypes.STRING,
    price: DataTypes.STRING,
    delete: DataTypes.STRING,
    TypeId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Dish',
  });
  return Dish;
};