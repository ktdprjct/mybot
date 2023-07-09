let axios = require("axios")
let apikey = global.xznkey
let { h5tuqq } = require("@xct007/frieren-scraper")
let { TelegraPh } = require('../../lib/uploader')
let handler = async (m,{ conn }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let download = await q.download(true)
    if (/image/g.test(mime)) {
        let link = await TelegraPh(download)
        let bf = (await
        axios.get(`https://xzn.wtf/api/toanime?url=${link}&apikey=${apikey}`,
        {responseType: 'arraybuffer'})).data
        
        await conn.sendFile(m.chat, bf, "", "nih", m)
    } else throw "mana gambarnya?"
}
handler.help = ['toanime']
handler.tags = ['tools']
handler.command = /^(toanime)$/i
handler.register = true
handler.limit = true
handler.disabled = false

module.exports = handler