const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Department = sequelize.define('Department', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
}, {
  tableName: 'departments',
  timestamps: false,
});

module.exports = Department;
