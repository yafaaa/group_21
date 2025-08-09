const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Dorm = sequelize.define('Dorm', {
  dorm_number: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
  },
  
}, {
  tableName: 'dorms',
  timestamps: false,
});

module.exports = Dorm;
