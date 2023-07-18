let handler = async(m, { conn, text }) => {
    if(!text) throw "masukkan code otpnya!!!"
    let id = m.chat
    let user = global.db.data.users[m.sender]
    conn.sendMail = conn.sendMail ? conn.sendMail : {}
    let ingfo = `「 *+add regist user!* 」\n\n👤 NAME : ${conn.sendMail[id].id}💌 EMAIL : ${conn.sendMail[id].email}\n✨ STATUS  : Sukses`
    
    if(conn.sendMail[id] == undefined ) {
        conn.reply(m.chat, "waktu habis. silahkan regist ulang!", m)
    } else {
        if (text == conn.sendMail[id].otpCode) {
        conn.reply(m.chat, `sekarang kamu terdaftar di database bot dengan email ${conn.sendMail[id].email}`, m)
        user.email = conn.sendMail[id].email
        user.regTime = + new Date
        user.registered = true
        
        conn.reply(set.owner[0][0] + `@s.whatsapp.net`, ingfo, m)
        
        delete conn.sendMail[id]
        } else conn.reply(m.chat, "otp yang kamu masukkan salah, silahkan masukkan ulang codenya", m)
    }
    await conn.reply(set.owner[0][0] + `@s.whatsapp.net`, ingfo, m)
}
handler.help = ['otp']
handler.tags = ['regist']
handler.command = /^otp/i

module.exports = handler