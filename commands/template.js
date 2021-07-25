module.exports = {
    commands: ['List', 'of', 'aliases'],
    expectedArgs: '<expected arguments>',
    permissionError: 'You need admin permissions to run this command',
    minArgs: 2,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        //TODO: command logic
    },
    permissions: ['ADMINISTRATOR'],
    requiredRoles: []
}