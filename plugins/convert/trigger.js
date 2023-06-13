let { UploadFileUgu, TelegraPh } = require('../../lib/uploader')
let handler = async (m, { conn, args }) => {
    if (m.quoted.mtype == "stickerMessage") throw 'fitur ini khusus gambar. jika itu sticker silahkan rubah ke gambar'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let media 
    try {
        media = await q.download()
    } catch {
        if (isUrl(args[0] || '')) media = args[0] 
        else throw err
    }
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    m.reply("wait")
    let marah = global.API('https://some-random-api.com', '/canvas/triggered', {
        avatar: await (isTele ? TelegraPh : UploadFileUgu)(media),
    })
    conn.sendSticker(m.chat, marah, m, {author: set.auth, asSticker: /webp/g.test(mime) })
}


handler.help = ['trigger']
handler.tags = ['sticker']
handler.command = /^(trigger)$/i
handler.register = true

module.exports = handler
function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
