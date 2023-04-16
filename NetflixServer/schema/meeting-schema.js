const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
    topic: String,
    timezone: String,
    created_at: Date,
    start_url: String,
    join_url: String,
    expire_at: Date,
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;