let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../../lib/uploader')
let handler = async (m, { conn, text, args}) => {
    let [t1, t2] = text.split`.`
    if (!text.includes('/')) throw 'textnya mana\n contoh: .memegen text atas/text bawah'
    if (!m.quoted) throw "reply gambarnya!"
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    if (!mime) throw `Mana fotonya?`
    if (!/image\/(jpe?g|png)/.test(mime)) throw `hanya gambar!!!`
    let media 
    try {
        media = await q.download()
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

module.exports = handler

function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}