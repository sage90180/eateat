'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    date: DataTypes.DATE,
    people: DataTypes.STRING,
    time: DataTypes.STRING,
    meal: DataTypes.STRING,
    content: DataTypes.STRING,
    delete: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};