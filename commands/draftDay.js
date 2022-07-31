module.exports = {
    commands: ['DraftDay', 'draftDay', 'draftday'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply(`
        We will be drafting September 4th. Time is still not yet decided.
        Location will be 14 Southgrove Ct Columbia SC 29212.
        LEAGUE DUES, KEEPERS, AND DRAFT PICK POSITION MUST BE IN BY AUGUST 21ST!!!
        Draft Order So Far (Not Set in Stone Until August 21st)
        1. Eric
        2. Mike
        3. Bill
        4. Cody
        5.
        6.
        7.
        8.
        9.
        10.

        Keepers Knows So Far (Not Set in Stone Until August 21st)
        Chris - Johnathan Taylor (1st)
        Nolan - Justin Jefferson (10th)
        Morgan - Michael Pittman (10th)
        Mike - Deebo Samuel (7th)
        
        `)
    }

}