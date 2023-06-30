let apikey = global.xznkey
let {fetchJson} = require("../../lib/function")
let handler = async(m, { conn, text }) => {
    if(!text) throw "mau tanya apa?"
    let hasil = await fetchJson(`https://xzn.wtf/api/openai?text=${text}&apikey=${apikey}`)
    m.reply(hasil.result)
}
handler.help = ['ai']
handler.tags = ['internet']
handler.command = /^(ai)$/i
handler.register = true
handler.limit = false
handler.disabled = false

module.exports = handler