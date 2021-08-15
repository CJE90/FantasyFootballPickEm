module.exports = {
    commands: ['makepicks', 'makePicks', 'MakePicks', 'Makepicks'],
    alias: 'makePicks',
    expectedArgs: '<week> <picks>',
    minArgs: 2,
    maxArgs: 2,
    callback: async (message, arguments, text, client, mongo, Discord) => {
        const picksString = arguments[1];
        const week = arguments[0];
        const picksArray = processInputString(picksString);


        const processsInputString = function (picksString) {
            const charToSplit = picksString.charAt(1);
            if (picksString.charAt(picksString.length - 1) === charToSplit) {
                picksString.slice(0, -1);
            }
            return picksString.split(`${charToSplit}`);
        }

    }
}