'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Coupon.init({
    img: DataTypes.STRING,
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    price: DataTypes.STRING,
    expire: DataTypes.DATE,
    delete: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};