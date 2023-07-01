let { TelegraPh } = require('../../lib/uploader')
const effects = ['jail', 'gay', 'glass', 'wasted' ,'triggered', 'lolice', 'simpcard', 'horny']

let handler = async (m, { conn, usedPrefix, text }) => {
    let effect = text.trim().toLowerCase()
    if (!effects.includes(effect)) throw `
*Usage:* ${usedPrefix}stickfilter <effectname>
*Example:* ${usedPrefix}stickfilter invert

*List Effect:*
${effects.map(effect => `_> ${effect}_`).join('\n')}
    `.trim()
    
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    if (!mime) throw 'mana gambarnya?'
    if (!/image\/(jpe?g|png)/.test(mime)) throw `khusus gambar`
    let img = await q.download()
    let url = await TelegraPh(img)
    
    let apiUrl = global.API('https://some-random-api.com/canvas/', encodeURIComponent(effect), {
        avatar: url
    })
    try {
        conn.sendSticker(m.chat, apiUrl, m, {author: set.auth, asSticker: /webp/g.test(mime) })
    } catch (e) {
        await conn.sendFile(m.chat, apiUrl, 'image.png', 'silahkan jadikan sticker', m)
    }
}

handler.help = ['smaker (caption|reply media)']
handler.tags = ['tools']
handler.command = /^(smaker)$/i
handler.limit = true
//handler.group = false
handler.register = true
handler.disabled = false

module.exports = handler