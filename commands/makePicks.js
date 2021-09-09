const scheduleSchema = require('../schemas/schedule-schema');
const userSchema = require('../schemas/user-schema');

module.exports = {
    commands: ['makepicks', 'makePicks', 'MakePicks', 'Makepicks'],
    alias: 'makePicks',
    expectedArgs: '<week> <picks>',
    minArgs: 2,
    maxArgs: 2,
    callback: async (message, arguments, text, client, mongo) => {

        const picksString = arguments[1];
        const week = arguments[0];
        //Ensure week is within range and also numeric
        if (week < 1 || week > 19 || isNaN(Number(week))) {
            return message.reply('Sorry, that week is invalid');
        }
        const leagueMember = message.author.id;

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

                    await userSchema.updateOne({ id: `${leagueMember}` }, { $set: { ["picks." + week]: teamPicks } });
                    return message.reply(`I saved your picks for week ${week}`);

                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB();

    }
}