const fetch = require("node-fetch")
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!args[0]) throw `Link nya mana?`
  m.react('⏱️')
  const link = await fetch(`https://api.zeeoneofc.my.id/api/downloader/youtube-audio?apikey=jjZFx5ww9ZqvPP3&url=${args[0]}`)
  let res = await link.json()
  let audio = res.result.download
  if (!audio) throw `Link download tidak ditemukan`
    conn.sendFile(m.chat, audio, res.result.title + '.mp3', `Sukses Download Video Dari Link ${args[0]}`, m)
}
handler.help = ['ytmp3']
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
module.exports = handler
