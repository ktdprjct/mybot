let { instagram } = require("@xct007/frieren-scraper")
let {fetchJson} = require("../../lib/function")
let apikey = global.xznkey

let handler = async(m, {conn, text, command}) => {
    command = command.toLowerCase()
    switch (command) {
        case 'ig': {
            m.reply("*Example:*\n.igv1 link\n.igv2 link\n\n*Pilih type yg ada*\n○ igv1\n○ igv2")
        }
        break;
        
        case 'igv1': {
            if (!text) return m.reply(`*Masukan URL Instagram nya!*\n\nContoh : .igv1 https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`)
            if (!text.match(/(https:\/\/www.instagram.com)/gi)) return m.reply("ini bukan link ig")
            let results = await instagram.v1(text)
            let out = results[0].url
            await m.reply("Permintaan sedang di proses")
            await conn.sendFile(m.chat, out, "", "nih", m)
        }
        break;
        
        case 'igv2': {
            if (!text) return m.reply(`*Masukan URL Instagram nya!*\n\nContoh : .igv2 https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`)
            if (!text.match(/(https:\/\/www.instagram.com)/gi)) return m.reply("ini bukan link ig")
            let anu = await fetchJson(`https://xzn.wtf/api/igdl?url=${text}&apikey=${apikey}`)
            conn.sendFile(m.chat, anu.media[0], "", anu.caption, m)
        }
        break;
    }
}
handler.help = ['igv1', 'igv2']
handler.tags = ['downloader']
handler.command = ['ig', 'igv1', 'igv2']
handler.register = true

module.exports = handler