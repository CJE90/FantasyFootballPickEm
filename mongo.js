const mongoose = require('mongoose');
//const config = require('./config.json');
//const mongoPath = `mongodb+srv://FantasyFootballPickEm:${config.mongoToken}@ffpickem.apngl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const mongoPath = `mongodb+srv://FantasyFootballPickEm:${process.env.MONGO_TOKEN}@ffpickem.apngl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose
}