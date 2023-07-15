
const nodemailer = require("nodemailer")
let timeout = 300000

let handler = async(m, {conn, text}) => {
    conn.sendMail = conn.sendMail ? conn.sendMail : {}
    let id = m.chat
    if (id in conn.sendMail) {
        conn.reply(m.chat, 'Silahkan cek kode otp pada emailmu. Jika email yang kamu masukkan salah kamu harus menunggu 5 menit agar bisa menggunakan ulang command ini', conn.sendMail[id][0])
        throw false
    }
    if(!text) throw "silahkan masukkan email anda!"
    if (!text.includes('@')) throw 'Contoh penggunaan: .reg ktdprjct@gmail.com'
    
    var name = conn.getName(m.sender)
    var otp = Math.random();
        otp = otp * 1000000;
        otp = parseInt(otp);
        console.log(otp);
    
    const iniHtml = `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <p>kode otpmu adalah<h1> ${otp}</h1></p>
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
        to: text,
        subject: "Email Verification",
        html: iniHtml
    }
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error) {
            console.log(error)
        } else {
            conn.reply(m.chat, `silahkan cek email ${text} untuk melihat code otp`, m)
        }
    })
    
    conn.sendMail[id] = {
        id: m.sender,
        email: text,
        otpCode: otp,
    }
    let ingfo = `「 *ADÀ YANG DAFTAR NIH!* 」\n\n💌 EMAIL : ${text}\n🔗 CODE OTP : ${otp}\n✨ STATUS  : proses`
    await conn.reply(set.owner[0][0] + `@s.whatsapp.net`, ingfo, m)

    setTimeout(() => {
        delete conn.sendMail[id]
    }, timeout)
}
handler.help = ['reg']
handler.tags = ['regist']
handler.command = /^reg$/i

module.exports = handler