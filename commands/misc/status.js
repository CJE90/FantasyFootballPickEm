module.exports = {
    commands: ['status'],
    expectedArgs: '<String>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 1,
    callback: (message, arguments, text, client) => {
        const content = message.content.replace(`!status `, ``);
        client.user.setPresence({
            activity: {
                name: content,
                type: "WATCHING"
            }
        })
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: ['LordOfTheBot']
}