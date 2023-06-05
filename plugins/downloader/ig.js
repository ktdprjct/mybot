let fetch = require("node-fetch")
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!global.db.data.users[m.sender].registered) {
        if (!m.chat.endsWith('g.us')) return conn.reply(m.chat, "testing", m)
    }
    if (!args[0]) return m.reply(`*Masukan URL Instagram nya!*\n\nContoh : ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`)
    if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return m.reply(status.invalid)
    const results = await fetch(global.API('https://xzn.wtf', '/api/igdl', {
        q: args[0]
    }, 'ktdprjct'))
    let json = await results.json()
    if (!json.status) throw json
    let name = conn.getName(m.sender)

    conn.sendFile(m.chat, json.media, 'ig.mp4', `Caption: ${json.caption}\nLink: ${await shortlink(json.media)}\n\n` + set.wm,  fake.contact(parseInt(m.sender), name))
}
handler.help = ['ig'].map(v => v + ' <url>')
handler.tags = ['downloader']

handler.command = /^(Instagram|ig|igdl)$/i
handler.limit = false

module.exports = handler

async function shortlink(url) {
	isurl = /https?:\/\//.test(url)
	return isurl ? (await require('axios').get('https://tinyurl.com/api-create.php?url='+encodeURIComponent(url))).data : ''
}