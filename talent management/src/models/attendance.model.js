const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student.model');
const Department = require('./department.model');

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  student_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Student,
      key: 'id',
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id',
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('present', 'absent'),
    allowNull: false,
  },
  because: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'attendance',
  timestamps: false,
});

module.exports = Attendance;
