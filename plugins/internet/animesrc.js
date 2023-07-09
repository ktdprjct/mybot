let { TelegraPh } = require('../../lib/uploader')
let {fetchJson} = require("../../lib/function")
let fetch = require("node-fetch")
let handler = async(m, { conn }) => {
    let q = m.quoted ? m.quoted : m
    if (!q) throw "media not found"
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let media = await q.download(true)
    let tele = await TelegraPh(media)
    
    let data = await fetchJson(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(tele)}`)
    const { anilist, similarity, filename, from, to, episode, video } = data.result[0]
    if ((similarity * 100).toFixed(1) < 89) throw `oops! ada gambar yang lebih jelas?\nAtau mungkin gambar yang kamu kirim bukan dari anime`
    //conn.reply(m.chat,JSON.stringify(anilist), m)
    let a = anilist.title
    let textnya = "";
        textnya += `${a.native}\n=> Romaji: ${a.romaji}\n=> English: ${a.english}\n`
        textnya += `=> Episode: ${episode}\n`
        textnya += `=> Time: ${formatTime(from)} / ${formatTime(to)}\n`
        textnya += `=> Similarity: ${(similarity * 100).toFixed(1)}%\n\n`
        //textnya += `${filename}`
        
    //conn.reply(m.chat, JSON.stringify(data.result), m)
    conn.sendFile(m.chat, data.result[0].image, "", textnya, m)
    
}
handler.help = ['source', 'animesrc']
handler.tags = ['internet']
handler.command = /^source|animesrc$/i

module.exports = handler

function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}

function formatTime(timeInSeconds) {
  let sec_num = Number(timeInSeconds);
  let hours = Math.floor(sec_num / 3600)
    .toString()
    .padStart(2, "0");
  let minutes = Math.floor((sec_num - hours * 3600) / 60)
    .toString()
    .padStart(2, "0");
  let seconds = (sec_num - hours * 3600 - minutes * 60).toFixed(0).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};