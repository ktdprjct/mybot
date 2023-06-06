
let fs = require('fs')
let chalk = require('chalk')
let yargs = require('yargs')
let moment = require('moment-timezone')

//=========== STICKER WM =============//
let days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'kamis', 'Jumat', 'sabtu']
let hari = new Date().getDay()
let dayss = days[hari]

let d = new Date(new Date + 3600000)
let locale = 'id'
let date = d.toLocaleDateString(locale, {
   day: 'numeric',
   month: 'long',
   year: 'numeric'
})
let time = d.toLocaleTimeString(locale, {
  hour: 'numeric',
  minute: 'numeric'
})

const sticker_name = ""
const sticker_author = `
sticker = {
    hari: "${dayss}",
    pukul: "${time}",
    tanggal: "${date}",
    botName: "ktdprjct-bot",
}
`

// batas
const opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
const prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')
global.set = {
//========={ SETTING HERE }=========//
    name: "My WeA Bot",
    version: "1.0.0",
    repo: 'https://github.com/ktdprjct',
    browser: ['My-MD by fld', 'Safari', '1.0.0'],
    wm: 'wa-bot by fld',
    sa: '乂 ',
    sb: '• ',
    pack: sticker_name,
    auth: sticker_author,
    owner: [
        ['62895323071410', 'fld', true],
        // JSON.parse(readFileSync('./src/owner.json'))
        // ['number', 'name', dev?]
    ],
//===================================//
    mods: [], //JSON.parse(readFileSync('./src/owner.json')),
    prems: [], //JSON.parse(readFileSync('./src/owner.json')),
    api: {
        name: { 
            s: {// API Prefix
                neoxr: 'https://api.neoxr.my.id',
                violet: 'https://violetics.pw',
                xteam: 'https://api.xteam.xyz',
                zahir: 'https://zahirr-web.herokuapp.com',
            }
        },
        key: {
            s: {// APIKey Here
               'https://api.neoxr.my.id': '5VC9rvNx',
               'https://violetics.pw': '0b55-fada-712f',
               'https://api.xteam.xyz': 'd90a9e986e18778b',
               'https://zahirr-web.herokuapp.com': 'zahirgans',      
            }
        }
    },
    opts: opts,
    prefix: prefix,
    timestamp: {
        start: new Date
    },
    image: 'https://telegra.ph/file/0cdfed9b3524af586b4cd.jpg',
    imgAkses: 'https://telegra.ph/file/e49b6ad967144bb0ebb27.jpg',
    gc: 'https://chat.whatsapp.com/KZwneZawhyx5udc2XzUe7W',
}

let warn = global.db.data.users[m.sender].warning
global.textWarn = `
🚩 *[ ${warn} / 5 ]* Verifikasi nomor dengan menggunakan email, 1 email untuk memverifikasi 1 nomor WhatsApp. Silahkan ikuti step by step berikut :

– *STEP 1*
Gunakan perintah *reg <email>* untuk mendapatkan kode verifikasi melalui email.
Contoh : *.reg ktdprjct@gmail.com*

– *STEP 2*
Buka email dan cek pesan masuk atau di folder spam, setelah kamu mendapat kode verifikasi silahkan kirim kode tersebut kepada bot dengan cara :
Contoh : *.otp 743675*

*Note* :
Mengabaikan pesan ini sebanyak *5x* kamu akan di banned dan tidak bisa menggunakan bot ini lagi, untuk membuka banned silahkan hubungi owner
`

global.limit = '10'
global.status = {
    invalid: 'URL is Invalid',
}
// batas

let file = require.resolve(__filename)
fs.watchFile(file, () => {
  fs.unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  delete require.cache[file]
  require(file)
})