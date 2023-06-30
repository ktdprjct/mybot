const { tiktokdl, savefrom } = require('@bochilteam/scraper')
const { tiktok } = require('../../lib/scrape.js') 
const { toAudio, toPTT } = require('../../lib/converter.js')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `${set.sb} *Example* : ${usedPrefix + command} url`
    if (!args[0].match(/((www|vt|vm).tiktok.com)/gi)) throw `Url salah, perintah ini untuk mengunduh Media Tiktok`
    m.react('⏱️')
    let hias = `${set.sa}  *T I K T O K   M P 4*\n\n`
    let name = conn.getName(m.sender)
    try {
        let res = await savefrom(args[0])
        let { id, url, meta, thumb, video_quality, sd, hd, hosting } = res[0] //ntalah savefrom sih
        let media = url[0].url
        let cap = `${hias}${set.sb} *Title* : ${meta.title}\n${set.sb} *Type* : Video\n${set.sb} *Ext* : mp4\n${set.sb} *Duration* : ${meta.duration}\n${set.sb} *Hosting* : ${hosting}\n${set.sb} *Source* : ${meta.source}\n`                  
        conn.sendFile(m.chat, media, meta.title, cap, fake.contact(parseInt(m.sender), name), /vn/.test([args[1]]))
    } catch {
        try {
            let res = await tiktokdl(args[0])
            let { author: { nickname }, video, description } = res
            let cap = `${hias}${set.sb} *Title* : ${description}\n${set.sb} *Author* : ${nickname}\n${set.sb} *Source* : ${args[0]}\n` 
            let media = video.no_watermark   
            conn.sendFile(m.chat, media, description, cap, fake.contact(parseInt(m.sender), name), /vn/.test([args[1]]))
        } catch (e) {
            throw e       
        }
    }
}
handler.help = ['tiktokmp4', 'tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(t(ik)?t(ok)?(d(own)?l(oader)?)?(mp4|v(ideo)?)?)$/i
handler.limit = true
handler.register = true
handler.disabled = false

handler.desc = ['Mendownload media video dari Tiktok, gunakan perintah *#tiktokmp4 url* hilangkan tanda < >']
module.exports = handler

// by bit.ly/AcellComel
