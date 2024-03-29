let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../../lib/uploader')
let handler = async (m, { conn, text, args}) => {
    let [t1, t2] = text.split`.`
    if (!text.includes('/')) throw 'textnya mana\n contoh: .memegen text atas/text bawah'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) throw `Mana fotonya?`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `hanya gambar!!!`
    
    //loading
    /*const { key } = await conn.reply(m.chat, 'Tunggu sebentar...', m);

    for (let i = 0; i < global.loading.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 3500));
        await  conn.editMessage(m.chat, key, global.loading[i], m)
    }*/
    
    let media 
    try {
        media = await q.download(true)
    } catch {
        if (isUrl(args[0] || '')) media = args[0]
    } 
    
    let isTele = /image\/(jpe?g|png)/.test(mime)
    let link = await (isTele ? TelegraPh : UploadFileUgu)(download)
    
    conn.sendSticker(m.chat, global.API('https://api.memegen.link', `/images/custom/${encodeURIComponent(t1)}/${encodeURIComponent(t2)}.png`, {
            background: link
        }), m, {author: set.auth, asSticker: /webp/g.test(mime) }
    )
}
handler.help = ['memegen'].map(v => v + '<apa/apa>')
handler.tags = ['tools']
handler.command = /^(memegen)$/i
handler.limit = true
handler.register = true
handler.disabled = false

module.exports = handler

function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}