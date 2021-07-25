module.exports = {
    commands: ['poll'],
    expectedArgs: 'None',
    callback: async (message, arguments, text) => {

        await message.delete().catch((error) => {
            console.log(error);
        });
        const addReactions = (message) => {
            message.react('👍');
            setTimeout(() => {
                message.react('👎')
            }, 750);
        }
        const fetchedMessage = await message.channel.messages.fetch({
            limit: 1
        }).catch((error) => {
            console.log(error);
        });
        if (fetchedMessage && fetchedMessage.first()) {
            addReactions(fetchedMessage.first())
        }
    }
}