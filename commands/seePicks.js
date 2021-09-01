const scheduleSchema = require('../schemas/schedule-schema');
const userSchema = require('../schemas/user-schema');
const nfl = require('../NFL_Teams.js');

module.exports = {
    commands: ['seepicks', 'seePicks', 'SeePicks'],
    expectedArgs: '<week>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, mongo, Discord) => {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        const week = arguments[0];
        const authorId = message.author.id;

        if (week < 1 || week > 19 || isNaN(Number(week))) {
            return message.reply('Sorry, that week is invalid');
        }

        const createEmbed = function (scheduleData, picksData) {
            const embed = new Discord.MessageEmbed();

            embed.setTitle(`Your picks for week ${week}`).setColor(randomColor);
            let count = 0;

            for (let i = 0; i < scheduleData.length - 1; i += 2) {

                const homeTeam = nfl.nfl[scheduleData[i]].name;
                const awayTeam = nfl.nfl[scheduleData[i + 1]].name;
                const userPicks = picksData[count];

                const embedString = userPicks === homeTeam ? `You picked the __**${homeTeam}**__ to beat the ${awayTeam}` : `You picked the __**${awayTeam}**__ to beat the ${homeTeam}`;

                embed.addField(`Game ${count + 1}`, embedString);
                count++;
            }
            message.channel.send(embed);
        }

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');
                    //Pull schedule data from DB
                    const userObject = await userSchema.find({ id: `${authorId}` });
                    const scheduleObject = await scheduleSchema.find({ week: `${week}` });

                    if (!scheduleObject) {
                        return message.reply(`Uh Oh. Something is wrong with the schedule for week ${week}`)
                    }

                    const picksArray = userObject[0].picks[week];
                    if (!picksArray) {
                        return message.reply(`It doesn't look like you have any picks saved for week ${week}`)
                    }
                    const scheduleArray = scheduleObject[0].games;

                    createEmbed(scheduleArray, picksArray);

                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB();
    }
}