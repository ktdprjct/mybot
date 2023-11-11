let fetch = require("node-fetch")
let { youtubeSearch, youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
let handler = async(m, {conn, text, command, args, usedPrefix}) => {
    if(!text) throw conn.sendMessage(m.chat, `Contoh: ${usedPrefix + command} judul atau url`)
    
    let Tot = await youtubeSearch(args[0])
    let vid = Tot.video[0]
    let texts = `
Judul: ${vid.title}
desc: ${vid.description}
Durasi: ${vid.durationH}
Publish: ${vid.publishedTime}`

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

