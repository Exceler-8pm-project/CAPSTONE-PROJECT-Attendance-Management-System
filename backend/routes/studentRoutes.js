const express = require('express');
const Student = require('../models/studentModel');
const Attendance = require('../models/attendanceModel');
const router = express.Router();

// Add a student
router.post('/', async (req, res) => {
  const { name, rollNo, department } = req.body;
  try {
    const student = new Student({ name, rollNo, department });
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Mark attendance
router.post('/attendance', async (req, res) => {
  const { studentId, date, status } = req.body;
  try {
    const attendance = new Attendance({ student: studentId, date, status });
    await attendance.save();
    res.status(201).send(attendance);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get attendance by student
router.get('/attendance/:studentId', async (req, res) => {
  try {
    const attendance = await Attendance.find({ student: req.params.studentId }).populate('student');
    res.status(200).send(attendance);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).send(students);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;