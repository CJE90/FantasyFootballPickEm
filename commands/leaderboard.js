const userSchema = require('../schemas/user-schema');

module.exports = {
    commands: ['leaderboard', 'Leaderboard'],
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: async (message, arguments, text, client, mongo, Discord) => {
        let teamsAndScoresArray = [];
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);

        const fetchFromMongoDB = async () => {
            await mongo().then(async (mongoose) => {
                try {
                    console.log('Connected to MongoDB');

                    const users = await userSchema.find();
                    users.forEach(x => {
                        let totalScore = 0;
                        const userScores = x.scores;
                        userScores.forEach(individualScores => {
                            totalScore += Number(individualScores);
                        })
                        teamsAndScoresArray.push([x.name, totalScore]);
                    })

                    teamsAndScoresArray.sort((a, b) => (a[1] < b[1]) ? 1 : -1);
                    const embed = new Discord.MessageEmbed();
                    embed.setTitle("Scores so far")
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
        //TODO: command logic
    }

}