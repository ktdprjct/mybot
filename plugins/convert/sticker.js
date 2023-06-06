let handler = async (m, { conn, usedPrefix, command, text, args }) => {
    if (!global.db.data.users[m.sender].registered) {
        let fetch = require("node-fetch")
        global.db.data.users[m.sender].warning += 1
        if (!m.chat.endsWith('g.us')) return conn.sendMessage(m.chat, {
            text: "testinggg", contextInfo: { mentionedJid: [m.sender],
                externalAdReply: {
                    title: set.wm,
                    body: '',
                    mediaType: 1,
                    showAdAttribution: true,
                    thumbnail: await (await fetch(set.imgAkses)).buffer(),
                    thumbnailUrl: set.imgAkses,
                    renderLargerThumbnail: true,
                    sourceUrl: set.gc,
                    mediaUrl: ``
                    }
                }
            }, {quoted: m}
        )
    }
    
    let err = `${set.sb} *Example* : ${usedPrefix + command} media/url\n\n_Gesek pesan ini kekanan untuk membuat *sticker*_`              
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ''
    let media 
    try {
        media = await q.download()
    } catch {
        if (isUrl(args[0] || '')) media = args[0] 
        else throw err
    } 
    if (q.seconds && (q.seconds > 15)) throw `Video maksimal 10 detik!`
    m.react('⏱️')
    conn.sendSticker(m.chat, media, m, {author: set.auth, asSticker: /webp/g.test(mime) })
}
handler.help = ['sticker'].map(v => v + ' <media/url>')
handler.tags = ['sticker']
handler.command = /^(s(tic?k(er)?)?(gif)?(video)?)$/i
handler.desc = ['Membuat stiker dengan media foto, video atau url']
module.exports = handler

function isUrl(text) {
    return text.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png)/, 'gi'))
}
