const userSchema = require('../schemas/user-schema');

module.exports = {
    commands: ['callout', 'callOut', 'CallOut', 'Callout'],
    expectedArgs: '<week>',
    minArgs: 1,
    maxArgs: 1,
    requiredRoles: ['LordOfTheBot'],
    callback: async (message, arguments, text, client, mongo, Discord) => {
        const week = arguments[0];

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');
                    const users = await userSchema.find();
                    users.forEach(x => {
                        const userId = x.id;
                        if (x.picks.length !== Number(week) + 1) {
                            message.channel.send(`<@${userId}> You havent put in your picks for week ${week}`)
                        }
                    })

                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB()
    }

}