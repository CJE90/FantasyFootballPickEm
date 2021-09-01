module.exports = {
    commands: ['stupidbot', 'StupidBot', 'stupidBot', 'Stupidbot'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply(`That's not very nice.`);
    }
}