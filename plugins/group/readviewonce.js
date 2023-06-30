let fs = require('fs')
let util = require('util')
let { UploadFileUgu, webp2mp4File, TelegraPh } = require('../../lib/uploader')
let handler = async (m, { conn }) => {
    if (!m.quoted) throw 'where\'s message?'
    if (m.quoted.viewOnce !== true) throw 'Itu bukan pesan viewOnce'
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let download = await q.download()
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime)
    let link = await (isTele ? TelegraPh : UploadFileUgu)(download)
    
    conn.sendMessage(m.chat, {
        text: q.caption || 'nothing', contextInfo: { mentionedJid: [m.sender],
            externalAdReply: {
                title: 'viewOnce',
                body: set.wm,
                mediaType: 1,
                showAdAttribution: true,
                thumbnail: await conn.getFile(link).then(v => v.data),
                thumbnailUrl: link,
                renderLargerThumbnail: true, 
                sourceUrl: link,
                mediaUrl: ``
            }
        }
	}, {quoted: m})
}
handler.help = ['readviewonce']
handler.tags = ['group']
handler.command = /^r(vo|eadviewonce)$/i
handler.group = true
handler.register = true
handler.disabled = false

module.exports = handler
