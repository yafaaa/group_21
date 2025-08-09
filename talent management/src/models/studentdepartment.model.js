const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Student = require('./student.model');
const Department = require('./department.model');

const StudentDepartment = sequelize.define('StudentDepartment', {
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
}, {
  tableName: 'studentdepartments',
  timestamps: false,
});

module.exports = StudentDepartment;
