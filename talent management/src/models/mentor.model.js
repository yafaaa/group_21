const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Department = require('./department.model');

const Mentor = sequelize.define('Mentor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id',
    },
  },
  
}, {
  tableName: 'mentors',
  timestamps: false,
});

module.exports = Mentor;
