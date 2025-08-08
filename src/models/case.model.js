const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student.model');

const Case = sequelize.define('Case', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  studentid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
  adminname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'cases',
  timestamps: false,
});

module.exports = Case;
