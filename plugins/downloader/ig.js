let fetch = require("node-fetch")
let got = require("got")
let cheerio = require("cheerio")
let { instagram } = require("@xct007/frieren-scraper")

let handler = async (m, { command, usedPrefix, conn, text, args }) => {
    if (!global.db.data.users[m.sender].registered) {
        if (!m.chat.endsWith('g.us')) return conn.reply(m.chat, "testing", m)
    }
    
    let lister = [
        "v1",
        "v2"
    ]
let spas = "                "
    let [feature, inputs, inputs_, inputs__, inputs___] = text.split(" ")
    if (!lister.includes(feature.toLowerCase())) return m.reply("*Example:*\n" + usedPrefix + command + " v2 link\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v.toUpperCase()).join("\n"))

    if (lister.includes(feature)) {
        if (feature == "v1") {
            if (!inputs) return m.reply("Input query link")
            m.reply("Permintaan sedang di proses")
                try {
                let results = await instagram.v1(inputs)

                let caption = `*[ I N S T A G R A M ]*`
                let out = results[0].url
                await m.reply("Permintaan sedang di proses")
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }
        }
        if (feature == "v2") {
            m.reply("dalam perbaikan")
            /*if (!inputs) return m.reply("Input query link")
            m.reply("Permintaan sedang di proses")
                try {
                let results = await (await fetch("https://fantox001-scrappy-api.vercel.app/instadl?url=" + inputs)).json()

                let caption = `*[ I N S T A G R A M ]*`
                let out = results.videoUrl

                await m.reply("Permintaan sedang di proses")
                await conn.sendFile(m.chat, out, "", caption, m)
            } catch (e) {
                await m.reply(eror)
            }*/
        }
    }
}
handler.help = ['instagram']
handler.tags = ['downloader']
handler.command = /^(ig(dl)?|instagram(dl)?)$/i

module.exports = handler