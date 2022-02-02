const userSchema = require('../schemas/user-schema');

module.exports = {
    commands: ['seepoints', 'seePoints', 'SeePoints'],
    expectedArgs: '<week>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text, client, mongo, Discord) => {
        let teamsAndScoresArray = [];
        const week = arguments[0];
        let randomColor = Math.floor(Math.random() * 16777215).toString(16);

        if (week < 1 || week > 22 || isNaN(Number(week))) {
            return message.reply('Sorry, that week is invalid');
        }

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');

                    const users = await userSchema.find();
                    for (let i = 0; i < users.length; i++) {
                        const user = users[i];
                        const userScore = user.scores[week];
                        if (userScore === undefined) {
                            break;
                        }
                        teamsAndScoresArray.push([user.name, userScore]);
                    }
                    if (teamsAndScoresArray.length != users.length) {
                        return message.reply("Hmmm, someone doesnt have any points set for that week. Thats wierd.");
                    }
                    console.log(teamsAndScoresArray);

                    teamsAndScoresArray.sort((a, b) => { return b[1] - a[1] });
                    console.log(teamsAndScoresArray);
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle(`Scores for week ${week}`)
                        .setColor(randomColor);
                    teamsAndScoresArray.forEach(x => {
                        embed.addField(x[0], x[1]);
                    })
                    message.channel.send(embed);
                } finally {
                    console.log('Closing MongoDB Connection');
                    mongoose.connection.close();
                }
            })
        }
        fetchFromMongoDB()
    }

}