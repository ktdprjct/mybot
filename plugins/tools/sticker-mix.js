let {fetchJson} = require("../../lib/function")

let handler = async (m, { conn, text, args }) => {
    if (!text.includes('.')) throw 'Contoh penggunaan:\n\n*.semoji2 🐷.😣*'
    let [emoji1, emoji2] = text.split`.`
    //loading
    const { key } = await conn.reply(m.chat, 'Tunggu sebentar...', m);

    for (let i = 0; i < global.loading.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 3500));
        await  conn.editMessage(m.chat, key, global.loading[i], m)
    }//
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
    for (let res of anu.results) {
        //conn.sendFile(m.chat, res.url, res.url, "nih", m)
        conn.sendSticker(m.chat, res.url, m, {author: set.auth, asSticker: /webp/g.test(mime) })
    }
}
handler.help = ['semoji2 😂.🥵']
handler.tags = ['tools']
handler.command = /^(emojimix|semoji2|smix)$/i
handler.register = true
handler.limit = true
handler.disabled = false

module.exports = handler