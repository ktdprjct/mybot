let instagramGetUrl = require('instagram-url-direct')
let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return m.reply(`*Masukan URL Instagram nya!*\n\nContoh : ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`)
    if (!args[0].match(/(https:\/\/www.instagram.com)/gi)) return m.reply(status.invalid)
    const results = (await instagramGetUrl(args[0]))
    let name = conn.getName(m.sender)

    conn.sendFile(m.chat, results.url_list[0], 'ig.mp4', `Link: ${await shortlink(results.url_list[0])}\n\n` + set.wm,  fake.contact(parseInt(m.sender), name))
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