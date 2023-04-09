let {Aki} = require("aki-api")
let fetch = require("node-fetch")
let wm = "Fld x Ido"
let images = "https://telegra.ph/file/e8e018696c574fc386e3b.jpg"
//let wm = global.set.wm
let handler = async(m, { conn, args }) => {
    conn.dbAkinator = conn.dbAkinator ? conn.dbAkinator : {}
    switch (args[0]) {
        case "start":
            if( conn.dbAkinator[m.chat] && conn.dbAkinator[m.chat].isOnSession === true ) {
                let diGame = `*AKINATOR GAME*\n\nKamu sudah berada didalam permainan\n`
                let gameFooter = `Game Session.\n  => Untuk melihat sesi akinator anda\nStop\n  => Stop bermain Akinator`
                await conn.sendButton(m.chat, diGame, gameFooter, [['Game Session', `.akinator mysession`], ['stop', '.akinator stop']], m)
            } else {
                conn.dbAkinator[m.chat] = new Aki({region: 'id', childMode: false, proxy: undefined})
                conn.dbAkinator[m.chat].isOnSession = true
                await conn.dbAkinator[m.chat].start()
                let sections = [
                    {
                        rows: [
                            {title: "Ya", rowId: ".akinator answer 0"},
                            {title: "Tidak", rowId: ".akinator answer 1"},
                            {title: "Tidak tau", rowId: ".akinator answer 2"},
                            {title: "Mungkin", rowId: ".akinator answer 3"},
                            {title: "Mungkin tidak", rowId: ".akinator answer 4"},
                        ]
                    }
                ]
                let listMessage = {
                    text: `=> Step : ${conn.dbAkinator[m.chat].currentStep + 1}\n=> Progress : ${conn.dbAkinator[m.chat].progress}%\n=> Pertanyaan : ${conn.dbAkinator[m.chat].question}`,
                    footer: "Klik tombol dibawah untuk menjawab>",
                    title: "*AKINATOR GAME*",
                    buttonText: "Pilih Disini",
                    sections: sections
                }
                await conn.sendMessage(m.chat, listMessage)
            }
        break
            
        case "stop":
            if (!conn.dbAkinator[m.chat]) return m.reply("Kamu tidak berada didalam game!")
            let stopGame = "*AKINATOR GAME*\n\n Kamu sudah keluar dari Akinator>\n"
            let stopFooter = "Start.\n  => Untuk mulai bermain Akinator\n"
            await conn.sendButton(m.chat, stopGame, stopFooter, [['Start', '.akinator start']], m)
            delete conn.dbAkinator[m.chat]
        break
        
        case "answer":
            if (!conn.dbAkinator[m.chat]) return m.reply("Kamu tidak berada didalam game!")
            else {
                if (conn.dbAkinator[m.chat].progress >= 70 || conn.dbAkinator[m.chat].currentStep >= 78) {
                    await conn.dbAkinator[m.chat].win()
                    if (conn.dbAkinator[m.chat].answers) {
                        let ans = conn.dbAkinator[m.chat].answers[0]
                        let hasil = `*AKINATOR GAME RESULT*\nSaya pikir itu adalah : \n\n=> *Jawaban:* ${ans.name}\n=> *Deskripsi:* ${ans.description}\nApakah jawaban saya benar?`
                        await conn.sendButton(m.chat, hasil, wm, await (await fetch(conn.dbAkinator[m.chat].answers[0].absolute_picture_path)).buffer(), [
                            ['benar', '.akinator benar'],
                            ['Salah', '.akinator salah'],
                            ['Start Again', '.akinator start']
                        ], m)
                        return delete conn.dbAkinator[m.chat]
                    }
                } else {
                    switch (args[1]) {
                        case "0":
                        case "1":
                        case "2":
                        case "3":
                        case "4":
                            await conn.dbAkinator[m.chat].step(args[1])
                            let sections = [
                                {
                                    rows: [
                                        {title: "Ya", rowId: ".akinator answer 0"},
                                        {title: "Tidak", rowId: ".akinator answer 1"},
                                        {title: "Tidak tau", rowId: ".akinator answer 2"},
                                        {title: "Mungkin", rowId: ".akinator answer 3"},
                                        {title: "Mungkin tidak", rowId: ".akinator answer 4"},
                                    ]
                                }
                            ]
                            let listMessage = {
                                text: `=> Step : ${conn.dbAkinator[m.chat].currentStep + 1}\n=> Progress : ${conn.dbAkinator[m.chat].progress}%\n=> Pertanyaan : ${conn.dbAkinator[m.chat].question}`,
                                footer: "Klik tombol dibawah untuk menjawab>",
                                title: "*AKINATOR GAME*",
                                buttonText: "Pilih Disini",
                                sections: sections
                            }
                            await conn.sendMessage(m.chat, listMessage)
                        break
                    }
                }
            }
        break
        
        case "benar":
            let benar = `yey saya berhasil menjawab\nMau main lagi?`
            conn.sendButton(m.chat, benar, wm, [['Main lagi', '.akinator start']], m)
        break
        
        case "salah":
            let salah = 'yah salah ya...\n mungkin kamu memasukkan data dengan salah\nmau coba lagi?'
            conn.sendButton(m.chat, salah, wm, [['Main lagi', '.akinator start']], m)
        break
        
        case "mysession":
            if (!conn.dbAkinator[m.chat]) return m.reply("Kamu tidak berada didalam game!")
            let sections = [
                {
                    rows: [
                        {title: "Ya", rowId: ".akinator answer 0"},
                        {title: "Tidak", rowId: ".akinator answer 1"},
                        {title: "Tidak tau", rowId: ".akinator answer 2"},
                        {title: "Mungkin", rowId: ".akinator answer 3"},
                        {title: "Mungkin tidak", rowId: ".akinator answer 4"},
                    ]
                }
            ]
            let listMessage = {
                text: `=> Step : ${conn.dbAkinator[m.chat].currentStep + 1}\n=> Progress : ${conn.dbAkinator[m.chat].progress}%\n=> Pertanyaan : ${conn.dbAkinator[m.chat].question}`,
                footer: "Klik tombol dibawah untuk menjawab>",
                title: "*AKINATOR GAME*",
                buttonText: "Pilih Disini",
                sections: sections
            }
            await conn.sendMessage(m.chat, listMessage)
        break
        
        default:
            let img = await (await fetch(images)).buffer()
            let awalGame = `*AKINATOR GAME*\n\n Pikirkan seorang karakter fiksi atau nyata.\nBot akan mencoba untuk menebaknya`
            let awalGameFooter = `Start.\n  => Untuk mulai bermain Akinator\nStop.\n  => Untuk mulai bermain Akinator\nGame Session.\n  => Untuk melihat sesi Akinator kamu\n`
            await conn.sendButton(m.chat, awalGame, awalGameFooter, img, [['Start', '.akinator start'], ['stop', '.akinator stop'], ['My Session', '.akinator mysession']], m)
        break
    } // switch
}

handler.help = ['akinator']
handler.tags = ['game']
handler.command = /^akinator$/i

module.exports = handler

// by ktdprjct x ido