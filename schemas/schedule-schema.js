const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    week: String,
    games: [],
    winners: []
})

module.exports = mongoose.model('Schedule', scheduleSchema, 'Schedule');