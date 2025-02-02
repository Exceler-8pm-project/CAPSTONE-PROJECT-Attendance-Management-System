const request = require('supertest'); 
const app = require('../server'); 
const mongoose = require('mongoose'); 
const Student = require('../models/studentModel'); 
beforeEach(async () => { 
await mongoose.connect('mongodb://localhost:27017/test'); 
}); 
afterEach(async () => { 
await mongoose.connection.dropDatabase(); 
await mongoose.disconnect(); 
}); 
describe('POST /api/students', () => { 
it('should create a new student', async () => { 
const res = await request(app) 
.post('/api/students') 
.send({ name: 'John Doe', rollNo: 'A123', department: 'CS' }); 
expect(res.status).toBe(201); 
expect(res.body.name).toBe('John Doe'); 
}); 
}); 
describe('GET /api/students', () => { 
it('should fetch all students', async () => { 
const res = await request(app).get('/api/students'); 
expect(res.status).toBe(200); 
expect(res.body).toHaveLength(0); // Should be empty for now 
}); 
}); 