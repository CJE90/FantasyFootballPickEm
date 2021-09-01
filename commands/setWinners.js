const scheduleSchema = require('../schemas/schedule-schema');
module.exports = {
    commands: ['setWinners', 'setwinners', 'SetWinners'],
    alias: 'setWinners',
    expectedArgs: '<week> <winners>',
    minArgs: 2,
    maxArgs: 2,
    permissionError: 'You need admin permissions to run this command',
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['LordOfTheBot'],
    callback: async (message, arguments, text, client, mongo, Discord) => {
        const week = arguments[0];
        const picksString = arguments[1]
        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');
                    await scheduleSchema.updateOne({ week: `${week}` }, { $set: { "winners": picksString } });
                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB();
    }
}