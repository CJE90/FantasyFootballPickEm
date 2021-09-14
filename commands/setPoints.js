const scheduleSchema = require('../schemas/schedule-schema');
const userSchema = require('../schemas/user-schema');

module.exports = {
    commands: ['setpoints', 'setPoints', 'SetPoints'],
    alias: 'setWinners',
    expectedArgs: '<week> <extra points games> <extra points>',
    minArgs: 3,
    maxArgs: 3,
    permissionError: 'You need admin permissions to run this command',
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['LordOfTheBot'],
    callback: async (message, arguments, text, client, mongo, Discord) => {

        const week = arguments[0];
        const primeTimeArray = arguments[1].split(',');
        const addedPoints = arguments[2];

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');

                    const scheduleObject = await scheduleSchema.find({ week: `${week}` });
                    let winners = scheduleObject[0].winners.split(',');

                    const users = await userSchema.find();
                    for (let i = 0; i < users.length; i++) {
                        let score = 0;
                        const picksArray = users[i].picks[`${week}`];
                        for (let j = 0; j < winners.length; j++) {

                            primeTimeArray.forEach(x => {
                                if (picksArray[x - 1] === winners[j]) {
                                    console.log(`In primetime array: ${x}`)
                                    console.log(`scoring points for ${picksArray[x - 1]} matching ${winners[j]} for user ${users[i]}`)
                                    score += addedPoints - 1;
                                }
                            })
                            if (picksArray[j] === winners[j]) {
                                console.log(`scoring points for ${picksArray[j]} matching ${winners[j]} for user ${users[i]}`)
                                score++;
                            }
                        }
                        await userSchema.updateOne({ name: `${users[i].name}` }, { $set: { ["scores." + week]: score } });

                    }
                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                    return message.reply(`Points have been calculated for week ${week}`)
                }
            })
        }
        fetchFromMongoDB();
    }
}