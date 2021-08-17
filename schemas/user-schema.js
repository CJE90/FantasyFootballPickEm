const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    name: String,
    id: String,
    picks: [],
    scores: [String]
})

module.exports = mongoose.model('users', userSchema);