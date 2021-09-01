const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    week: String,
    games: [],
    winners: String
})

module.exports = mongoose.model('Schedule', scheduleSchema, 'Schedule');