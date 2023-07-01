let { TelegraPh } = require('../../lib/uploader')
const effects = ['greyscale', 'pixelate', 'invert', 'brightness', 'threshold', 'sepia', 'red', 'green', 'blue', 'blurple', 'blur']

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
    
    //loading
    const { key } = await conn.reply(m.chat, 'Tunggu sebentar...', m);

    for (let i = 0; i < global.loading.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 3500));
        await  conn.editMessage(m.chat, key, global.loading[i], m)
    }//
            
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

handler.help = ['sfilter (caption|reply media)']
handler.tags = ['tools']
handler.command = /^(sfilter)$/i
handler.limit = true
//handler.group = false
handler.register = true
handler.disabled = false

module.exports = handler