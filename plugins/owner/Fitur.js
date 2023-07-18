let fs = require("fs")

let handler = async(m, { conn, text }) => {
    command = command.toLowerCase()
    switch (command) {
        
        case 'sf': {
            if (!text) throw `where is the path?\n\nexample:\n.sf plugins/main-info/menu.js`
            if (!m.quoted.text) throw `reply code`
            
            let path = `${text}`
            await fs.writeFileSync(path, m.quoted.text)
            m.reply(`Saved ${path} to file!`)
        }
            break;
        
        case 'delfitur': {
            if (!text) throw `where is the path?\n\nexample:\n.delfitur plugins/main-info/menu.js`
            
            await fs.unlinkSync(text)
            m.reply(`Delete ${path} to file!`)
        }
            break;
        
        case 'openfile': {
            if (!text) throw `where is the path?\n\nexample:\n.openfile plugins/main-info/menu.js`
            
            let pile = await fs.readFileSync(text)
            await conn.sendFile(m.chat, pile, '', 'Nihh,?', m)
        }
            break;
        
        
    }
}