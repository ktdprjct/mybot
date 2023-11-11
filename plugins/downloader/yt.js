let fetch = require("node-fetch")
let yts = require("youtube-yts")
let confirmation = {}

async function handler(m, {conn, text, command, args, usedPrefix}) {
    if(!text) throw conn.sendMessage(m.chat, `Contoh: ${usedPrefix + command} judul atau url`)
    
    let link = await yts(args[0])
    let vid = link.all[0]
    let texts = `
➥ ᴛɪᴛʟᴇ: ${vid.title}
➥ ᴠɪᴇᴡs: ${vid.views}
➥ ᴀᴜᴛʜᴏʀ: ${vid.author.name}
➥ ᴅᴜʀᴀᴛɪᴏɴ: ${vid.timestamp}
➥ ᴜᴘʟᴏᴀᴅ ᴏɴ: ${vid.ago}
➥ ᴜʀʟ: ${vid.url}

_Untuk melanjutkan silahkan ketik_
*1/Y/Ya = Download Audio*
*0/N/No = Untuk Membatalkan*
`

    conn.sendMessage(m.chat, {image: {url: vid.thumbnail}, caption: texts})
    
    confirmation[m.sender] = {
        sender: m.sender,
        message: m,
        link: vid.url,
        timeout: setTimeout(() => (m.reply('Timeout'), delete confirmation[m.sender]), 60 * 1000)
    }
}

handler.before = async function(m, { conn }) {
    if (m.isBaileys) return
    if (!(m.sender in confirmation)) return
    if (!m.text) return
    let { timeout, sender, message, link} = confirmation[m.sender]
    if (m.id === message.id) return
    //commandnya
    if (/(0|n(o)?)/g.test(m.text.toLowerCase())) {
        clearTimeout(timeout)
        delete confirmation[sender]
        return m.reply('Reject')
    }
    if (/(1|y(a)?)/g.test(m.text.toLowerCase())) {
        m.reply('wait...')
        let ytdl = await (await fetch(`https://skizo.tech/api/yt1s?url=${link}&apikey=filand`)).json()
        let res_m = await ytdl.audio['128k'].url
        
        await conn.sendMessage(
            m.chat, 
            { audio: { url: res_m }, mimetype: 'audio/mp4' },
            { url: res_m } // can send mp3, mp4, & ogg
        )
        clearTimeout(timeout)
        delete confirmation[sender]
    }
}


handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play$/i
module.exports = handler
