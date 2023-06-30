let {fetchJson} = require("../../lib/function")

let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
  if (!args[0]) throw `Link nya mana?`
  m.react('⏱️')
  const link = await fetchJson(`https://xzn.wtf/api/y2mate?url=${args[0]}&apikey=ktdprjct`)
  let audio = link.links.audio.128kbps.url
  if (!audio) throw `Link download tidak ditemukan`
    conn.sendFile(m.chat, audio, link.title + '.mp3', `Sukses Download Video Dari Link ${args[0]}`, m)
}
handler.help = ['ytmp3']
handler.tags = ['downloader']
handler.command = /^yt(a|mp3)$/i
handler.register = true
handler.limit = true
handler.disabled = true

module.exports = handler
