const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: String,
    thumbnail: String,
    tag: String
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;