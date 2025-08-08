const { Student, Case, Department, TechStack } = require('../models');
const User = require('../models/user.model');

async function syncModels() {
  try {
  await Department.sync();
  await TechStack.sync();
  await Student.sync();
  await Case.sync();
  await User.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Error syncing models:', error);
  }
}

syncModels();
