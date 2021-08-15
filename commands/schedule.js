const scheduleSchema = require('../schemas/schedule-schema');
const nfl = require('../NFL_Teams.js');

module.exports = {
    commands: ['schedule'],
    alias: 'schedule',
    expectedArgs: '<week>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, mongo, Discord) => {

        const weekWanted = arguments[0];
        //Ensure week is within range and also numeric
        if (weekWanted < 1 || weekWanted > 19 || typeof (weekWanted) != Number) {
            return message.reply('Sorry, that week is invalid');
        }

        //function to create embed with schedule data pulled from DB
        const createEmbed = function (data) {
            const schedule = data.games;
            const embed = new Discord.MessageEmbed();

            embed.setTitle(`<:NFL:620701250371059742> Schedule for week ${data.week}`);
            //Iterate through schedule and format
            for (let i = 0; i < schedule.length - 1; i += 2) {

                const id1 = nfl.nfl[`${schedule[i]}`].id
                const name1 = nfl.nfl[`${schedule[i]}`].name
                const id2 = nfl.nfl[`${schedule[i + 1]}`].id
                const name2 = nfl.nfl[`${schedule[i + 1]}`].name

                embed.addField(`${schedule[i].toUpperCase()} @ ${schedule[i + 1].toUpperCase()}`
                    , `${i + 1}. <:${name1}:${id1}> @ ${i + 2}. <:${name2}:${id2}>`)
            }
            message.channel.send(embed);
        }

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');
                    //Pull schedule data from DB
                    const response = await scheduleSchema.find({ week: `${weekWanted}` });

                    createEmbed(response[0]);
                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB();
    }
}