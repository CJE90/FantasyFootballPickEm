const scheduleSchema = require('../schemas/schedule-schema');
const userSchema = require('../schemas/user-schema');

module.exports = {
    commands: ['setteampicks', 'setTeamPicks', 'setteamPicks', 'setTeampicks'],
    alias: 'setTeamPicks',
    expectedArgs: '<week> <team> <picks>',
    minArgs: 3,
    maxArgs: 3,
    permissionError: 'You need admin permissions to run this command',
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['LordOfTheBot'],
    callback: async (message, arguments, text, client, mongo) => {

        const picksString = arguments[2];
        const team = arguments[1];
        const week = arguments[0];
        //Ensure week is within range and also numeric
        if (week < 1 || week > 22 || isNaN(Number(week))) {
            return message.reply('Sorry, that week is invalid');
        }
        //const leagueMember = message.author.id;

        const processInputString = function (picksString) {
            const charToSplit = picksString.charAt(1);
            if (picksString.charAt(picksString.length - 1) === charToSplit) {
                picksString.slice(0, -1);
            }
            return picksString.split(`${charToSplit}`);
        }

        const picksArray = processInputString(picksString);

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');
                    //Pull schedule data from DB
                    const [response, ...data] = await scheduleSchema.find({ week: `${week}` });
                    if (response === undefined) {
                        return message.reply("Uh oh. I couldnt find those game for that week")
                    }
                    const schedule = response.games;
                    const teamPicks = picksArray.map((x) => schedule[x - 1]);
                    if (teamPicks.length > schedule.length / 2) {
                        return message.reply("You made more picks than you should have!");
                    }
                    else if (teamPicks.length < schedule.length / 2) {
                        return message.reply("You didn't pick a winner from each game!")
                    }
                    await userSchema.updateOne({ name: `${team}` }, { $set: { ["picks." + week]: teamPicks } });
                    return message.reply(`I saved ${team}'s picks for week${week}`);
                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB();

    }
}