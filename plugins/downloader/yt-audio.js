let { youtubedl, youtubedlv2, youtubedlv3 } = require("@bochilteam/scraper")
let fetch = require("node-fetch")

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
    if (!args[0]) throw `Link nya mana?`
    
    
    const { thumbnail, audio: _audio, title } = await youtubedl(args[0]).catch(async _ => await youtubedlv2(args[0])).catch(async _ => await youtubedlv3(args[0]))
    let audio, res, link
    
    for (let i in _audio) {
        try {
            audio = _audio[i]
            if (isNaN(audio.fileSize)) continue
            link = await audio.download()
            if (link) res = await fetch(link)
            break
        } catch (e) {
            console.error(e)
        }
    }
    //console.log('link' + link)
    conn.sendFile(m.chat, link, "", title, m)
}
handler.help = ['ytmp3']
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
handler.register = true
handler.limit = true
handler.disabled = false

module.exports = handler
