const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const mongo = require('./mongo.js');
const command = require('./command.js');
const userSchema = require('./schemas/user-schema');
const path = require('path');
const fs = require('fs');

// const connectToMongoDB = async () => {
//     await mongo().then(async (mongoose) => {
//         try {
//             console.log('Connected to MongoDB');

//         } finally {
//             console.log('Closing MongoDB Connection');
//             mongoose.connection.close();
//         }
//     })
// }

const baseFile = 'command-base.js';
const commandBase = require(`./commands/${baseFile}`);
// Recursively read through all command files and folders
const readCommands = dir => {
    const files = fs.readdirSync(path.join(__dirname, dir));
    for (const file of files) {
        const stat = fs.lstatSync(path.join(__dirname, dir, file));
        if (stat.isDirectory()) {
            readCommands(path.join(dir, file));
        }
        else if (file !== baseFile) {
            const option = require(path.join(__dirname, dir, file));
            commandBase(option);
        }
    }
}

client.on('ready', () => {
    console.log("Client ready");

    readCommands('commands');

    commandBase.listen(client, mongo, Discord);

    //connectToMongoDB();
})

client.login(process.env.DJS_TOKEN);
//client.login(config.token);