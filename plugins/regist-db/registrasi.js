
const nodemailer = require("nodemailer")
let timeout = 300000

let handler = async(m, {conn, text}) => {
    let user = global.db.data.users[m.sender]
    if(user.registered === true) throw "kamu sudah terdaftar di database bot"
    conn.sendMail = conn.sendMail ? conn.sendMail : {}
    let id = m.sender
    if (id in conn.sendMail) {
        conn.reply(m.chat, `Silahkan cek kode otp yang dikirim bot ke email ${conn.sendMail[id].email}\nJika email yang kamu masukkan salah kamu harus menunggu 5 menit agar bisa menggunakan ulang command ini`, m)
        throw false
    }
    if(!text) throw "silahkan masukkan email anda!"
    if (!text.includes('@')) throw 'Contoh penggunaan: .reg ktdprjct@gmail.com'
    
    var name = conn.getName(m.sender)
    var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);
        
    conn.sendMail[id] = {
        id: m.sender,
        names: name,
        email: text,
        otpCode: otp,
    }
    
    const iniHtml = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <p>Hai ${conn.sendMail[id].names} kode otpmu adalah :<h1> ${conn.sendMail[id].otpCode}</h1></p>
            </body>
        </html>`
    
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service : 'gmail',
        auth: {
            user: "ktdprjct@gmail.com",
            pass: "aoywlmxhtvtjoazj"
        }
    })
    
    const mailOptions = {
        from: '"ktdprjct"<ktdprjct@gmail.com>',
        to: conn.sendMail[id].email,
        subject: "Email Verification",
        html: iniHtml
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error)
        } else {
            conn.reply(m.chat, `silahkan cek email ${conn.sendMail[id].email} untuk melihat code otp`, m)
        }
    })
    
    let ingfo = `「 *ADA YANG DAFTAR NIH!* 」\n\n👤 NAME : ${conn.getName(conn.sendMail[id].id)}\n💌 EMAIL : ${conn.sendMail[id].email}\n🔗 CODE OTP : ${conn.sendMail[id].otpCode}\n✨ STATUS : proses`
    await conn.reply(set.owner[0][0] + `@s.whatsapp.net`, ingfo, m)

    setTimeout(() => {
        delete conn.sendMail[id]
    }, timeout)
}
handler.help = ['reg']
handler.tags = ['regist']
handler.command = /^reg$/i

module.exports = handler