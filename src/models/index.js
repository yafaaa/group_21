const Student = require('./student.model');
const Case = require('./case.model');
const Department = require('./department.model');
const TechStack = require('./techstack.model');

Student.hasMany(Case, { foreignKey: 'studentid' });
Case.belongsTo(Student, { foreignKey: 'studentid' });

Department.hasMany(TechStack, { foreignKey: 'department' });
TechStack.belongsTo(Department, { foreignKey: 'department' });

module.exports = {
  Student,
  Case,
  Department,
  TechStack,
};
