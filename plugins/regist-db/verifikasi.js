let handler = async(m, { conn, text }) => {
    if(!text) throw "masukkan code otpnya!!!"
    let id = m.chat
    let user = global.db.data.users[m.sender]
    conn.sendMail = conn.sendMail ? conn.sendMail : {}
    
    if(conn.sendMail[id] == undefined ) {
        conn.reply(m.chat, "waktu habis. silahkan regist ulang!", m)
    } else {
        if (text == conn.sendMail[id].otpCode) {
        conn.reply(m.chat, "berhasil", m)
        user.email = conn.sendMail[id].email
        user.regTime = + new Date
        user.registered = true
        delete conn.sendMail[id]
        } else conn.reply(m.chat, "gagal silahkan masukkan ulang codenya", m)
    }
}
handler.help = ['otp']
handler.tags = ['regist']
handler.command = /^otp/i

module.exports = handler