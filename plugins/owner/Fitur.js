let fs = require("fs")

let handler = async(m, { conn, text }) => {
    command = command.toLowerCase()
    switch (command) {
        case 'sf':
            if (!text) throw `where is the path?\n\nexample:\n${usedPrefix + command} plugins/menu.js`
            if (!m.quoted.text) throw `reply code`
            
            let path = `${text}`
            await fs.writeFileSync(path, m.quoted.text)
            m.reply(`Saved ${path} to file!`)
            break;
        
    }
}