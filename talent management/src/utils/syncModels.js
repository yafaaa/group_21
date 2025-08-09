const { Student, Department, Dorm, Mentor, Admin, StudentDepartment, Attendance } = require('../models');
const User = require('../models/user.model'); 

async function syncModels() {
  try {
    await Department.sync();
    await Dorm.sync();
    await Mentor.sync();
    await Admin.sync();
    await Student.sync();
    await StudentDepartment.sync();
    await Attendance.sync();
    
    console.log('models  migrated successfully.');
  } catch (error) {
    console.error('Error migrating models:', error);
  }
}

syncModels();
