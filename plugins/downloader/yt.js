let fetch = require("node-fetch")
const yts = require("youtube-yts")
let handler = async(m, {conn, text, command, args, usedPrefix}) => {
    if(!text) throw conn.sendMessage(m.chat, `Contoh: ${usedPrefix + command} judul atau url`)
    
    let link = await yts(args[0])
    let vid = link.all[0]
    let texts = `
➥ ᴛɪᴛʟᴇ: ${vid.title}
➥ ᴠɪᴇᴡs: ${vid.views}
➥ ᴀᴜᴛʜᴏʀ: ${vid.author.name}
➥ ᴅᴜʀᴀᴛɪᴏɴ: ${vid.timestamp}
➥ ᴜᴘʟᴏᴀᴅ ᴏɴ: ${vid.ago}
➥ ᴜʀʟ: ${vid.url}`

    conn.sendMessage(m.chat, {image: {url: vid.thumbnail}, caption: texts})
    
    let ytdl = await (await fetch(`https://skizo.tech/api/yt1s?url=${vid.url}&apikey=filand`)).json()
    let res_m = await ytdl.audio['128k'].url
    
    await conn.sendMessage(
        m.chat, 
        { audio: { url: res_m }, mimetype: 'audio/mp4' },
        { url: res_m } // can send mp3, mp4, & ogg
    )

}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play$/i
module.exports = handler

