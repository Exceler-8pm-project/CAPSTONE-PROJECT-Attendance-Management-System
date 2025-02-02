const Student = require('./models/Student'); // Import Student model
const Attendance = require('./models/Attendance'); // Import Attendance model

// Add a new student
exports.addStudent = async (req, res) => {
    try {
        const { name, email, rollNumber, className } = req.body;
        const student = new Student({ name, email, rollNumber, className });
        await student.save();
        res.status(201).json({ message: "Student added successfully", student });
    } catch (error) {
        res.status(500).json({ error: "Error adding student" });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: "Error fetching students" });
    }
};

// Mark attendance
exports.markAttendance = async (req, res) => {
    try {
        const { studentId, date, status } = req.body;
        const attendance = new Attendance({ studentId, date, status });
        await attendance.save();
        res.status(201).json({ message: "Attendance marked successfully", attendance });
    } catch (error) {
        res.status(500).json({ error: "Error marking attendance" });
    }
};

// Get attendance records
exports.getAttendanceRecords = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('studentId', 'name rollNumber');
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: "Error fetching attendance records" });
    }
};
