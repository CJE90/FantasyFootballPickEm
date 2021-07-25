const Discord = require('discord.js');
//const config = require('./config.json');
const client = new Discord.Client();
const command = require('./commands.js');

client.on('ready', () => {
    console.log("Client ready");
    command(client, 'ping', message => {
        message.channel.send(`Pong`);
    })
    command(client, 'status', message => {
        const content = message.content.replace(`!status `, ``);
        client.user.setPresence({
            activity: {
                name: content,
                type: "WATCHING"
            }
        })
    })
    command(client, 'poll', async message => {
        await message.delete();
        const addReactions = (message) => {
            message.react('👍');
            setTimeout(() => {
                message.react('👎')
            }, 750);
        }
        const fetchedMessage = await message.channel.messages.fetch({
            limit: 1
        })
        if (fetchedMessage && fetchedMessage.first()) {
            addReactions(fetchedMessage.first())
        }
    })
})

client.login(process.env.DJS_TOKEN);
//client.login(config.token);