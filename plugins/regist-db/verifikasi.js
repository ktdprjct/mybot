let handler = async(m, { conn, text }) => {
    let id = m.chat
    let user = global.db.data.users[m.sender]
    conn.sendMail = conn.sendMail ? conn.sendMail : {}
    if(user.registered === true) throw "kamu sudah terdaftar di database bot"
    
    
    if(conn.sendMail[id] == undefined ) {
        conn.reply(m.chat, "silahkan regist dengan cara : .reg <emailmu>", m)
    } else {
        if(!text) throw "masukkan code otpnya!!!"
        
        if (text == conn.sendMail[id].otpCode) {
            conn.reply(m.chat, `sekarang kamu terdaftar di database bot dengan email ${conn.sendMail[id].email}`, m)
            user.email = conn.sendMail[id].email
            user.regTime = + new Date
            user.registered = true
            
            let ingfo = `「 *+add regist user!* 」\n\n👤 NAME : ${conn.getName(conn.sendMail[id].id)}\n💌 EMAIL : ${conn.sendMail[id].email}\n✨ STATUS  : Sukses`
            await conn.reply(set.owner[0][0] + `@s.whatsapp.net`, ingfo, m)
            
            delete conn.sendMail[id]
        } else conn.reply(m.chat, "otp yang kamu masukkan salah, silahkan masukkan ulang codenya", m)
    }
}
handler.help = ['otp']
handler.tags = ['regist']
handler.command = /^otp/i

module.exports = handler