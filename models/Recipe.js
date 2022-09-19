const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Recipe extends Model {}

Recipe.init({
    title: DataTypes.STRING,
    ingredients: DataTypes.STRING,
    instructions: DataTypes.STRING
}, {
    sequelize
});

module.exports = Recipe;