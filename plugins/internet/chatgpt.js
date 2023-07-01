let apikey = global.xznkey
const { ChatGpt } = require('chatgpt-scraper')
let {fetchJson} = require("../../lib/function")

let handler = async(m, { conn, text }) => {
    if(!text) throw "mau tanya apa?"
    try {
        let hasil = await fetchJson(`https://xzn.wtf/api/openai?text=${text}&apikey=${apikey}`)
        m.reply(hasil.result)
    } catch {
        try {
            const res = await ChatGpt(text)
            m.reply(res)
        } catch (e) { throw e }
    }
}

handler.help = ['ai']
handler.tags = ['internet']
handler.command = /^(ai)$/i
handler.register = true
handler.limit = false
handler.disabled = false

module.exports = handler