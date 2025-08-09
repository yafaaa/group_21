const Student = require('./student.model');
const Department = require('./department.model');
const Dorm = require('./dorm.model');
const Mentor = require('./mentor.model');
const Admin = require('./admin.model');
const StudentDepartment = require('./studentdepartment.model');
const Attendance = require('./attendance.model');

Dorm.hasMany(Student, { foreignKey: 'dorm_number' });
Student.belongsTo(Dorm, { foreignKey: 'dorm_number' });

Department.hasMany(Mentor, { foreignKey: 'department_id' });
Mentor.belongsTo(Department, { foreignKey: 'department_id' });

Student.belongsToMany(Department, { through: StudentDepartment, foreignKey: 'student_id', otherKey: 'department_id' });
Department.belongsToMany(Student, { through: StudentDepartment, foreignKey: 'department_id', otherKey: 'student_id' });

Student.hasMany(Attendance, { foreignKey: 'student_id' });
Attendance.belongsTo(Student, { foreignKey: 'student_id' });
Department.hasMany(Attendance, { foreignKey: 'department_id' });
Attendance.belongsTo(Department, { foreignKey: 'department_id' });

module.exports = {
  Student,
  Department,
  Dorm,
  Mentor,
  Admin,
  StudentDepartment,
  Attendance,
};
