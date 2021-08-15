const mongoose = require('mongoose');

const scheduleSchema = mongoose.Schema({
    week: String,
    games: []
})

module.exports = mongoose.model('Schedule', scheduleSchema, 'Schedule');