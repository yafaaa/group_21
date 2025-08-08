const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Department = require('./department.model');

const TechStack = sequelize.define('TechStack', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Department,
      key: 'name',
    },
  },
}, {
  tableName: 'techstacks',
  timestamps: false,
});

module.exports = TechStack;
