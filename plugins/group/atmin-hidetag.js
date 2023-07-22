let { generateWAMessageFromContent } = require('baileys')
let handler = async (m, { conn, text, isAdmin, isOwner, participants }) => {
  if (!isAdmin || !isOwner) throw "fitur ini khusus admin!"
  let home = participants.map(u => u.id)
  let q = m.quoted ? m.quoted : m
  let c = m.quoted ? m.quoted : m.msg
  let msg = await conn.cMod(
    m.chat,
    await generateWAMessageFromContent(
      m.chat,
      {
        [c.toJSON ? q.mtype : 'extendedTextMessage']: c.toJSON ? c.toJSON() : {
          text: await c || ''
        },
        mentions: await home
      }, {
        quoted: null,
        userJid: conn.user.id
      }
    ),
    text || q.text, conn.user.jid,
    {
      mentions: await home
    }
  )
  await conn.relayMessage(m.chat, msg.message, {
    messageId: msg.key.id
  })
}
handler.help = ['hidetag', 'pengumuman'].map(v => v + ' [teks]')
handler.tags = ['group']
handler.command = /^(pengumuman|announce|hiddentag|hidetag)$/i
handler.register = true
handler.disabled = false
handler.group = true

module.exports = handler

// Aguz Familia
