let handler = async (m, { conn, text }) => {
    let name = m.fromMe ? conn.user : conn.contacts[m.sender]
conn.reply( `62895323071410@s.whatsapp.net`, ` *owner ada yang cariin tuh :v*`, m)

  conn.reply(m.chat, `
Pesanmu akan di sampaikan ke owner.
`.trim(), m)
    let mentionedJid = [m.sender]
}
handler.customPrefix = /@62895323071410/i
handler.command = new RegExp

module.exports = handler
