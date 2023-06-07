const fetch = require("node-fetch")
module.exports = (m, conn = { user: {} }) => {
    const isNumber = x => typeof x === 'number' && !isNaN(x)
    let user = global.db.data.users[m.sender]
    if (typeof user !== 'object') global.db.data.users[m.sender] = {}
    if (user) {
        if (!isNumber(user.afk)) user.afk = -1
        if (!('afkReason' in user)) user.afkReason = ''
        if (!('banned' in user)) user.banned = false
        if (!isNumber(user.banTemp)) user.banTemp = 0
        if (!isNumber(user.banTimes)) user.banTimes = 0
        if (!isNumber(user.limit)) user.limit = global.limit
        if (!('premium' in user)) user.premium = false
        if (!isNumber(user.expired)) user.expired = 0
        if (!isNumber(user.lastseen)) user.lastseen = 0
        if (!isNumber(user.hit)) user.hit = 0
        if (!isNumber(user.spam)) user.spam = 0
        if (!isNumber(user.warning)) user.warning = 0
        if (!('registered' in user)) user.registered = false
        if (!user.registered) {
            if (!('name' in user)) user.name = conn.getName(m.sender)
            if (!('email' in user)) user.email = ''
            if (!isNumber(user.regTime)) user.regTime = -1
        }
    } else global.db.data.users[m.sender] = {
    	afk: -1,
        afkReason: '',
        banned: false,
        banTemp: 0,
        banTimes: 0,
        limit: global.limit,
        premium: false,
        expired: 0,
        lastseen: 0,
        hit: 0,
        spam: 0,
        warning: 0,
        registered: false,
        name: conn.getName(m.sender),
        email: '',
        regTime: -1
    }
    
    if (m.isGroup) {
        let group = global.db.data.group.find(v => v.jid == m.chat)
        //if (typeof group !== 'object') global.db.data.group[m.chat] = {}
        if (group) {
            if (!isNumber(group.activity)) group.activity = 0
             if (!('autoread' in group)) group.autoread = true
             if (!('welcome' in group)) group.welcome = true
             if (!('detect' in group)) group.detect = true
             if (!('only' in group)) group.only = false
             if (!('antidelete' in group)) group.antidelete = false
             if (!('antilink' in group)) group.antilink = true
             if (!('antivirtex' in group)) group.antivirtex = true
             if (!('filter' in group)) group.filter = false
             if (!('left' in group)) group.left = false
             if (!('localonly' in group)) group.localonly = false
             if (!('mute' in group)) group.mute = false
             if (!('stay' in group)) group.stay = false
             if (!('sWelcome' in group)) group.sWelcome = ''
             if (!('sBye' in group)) group.sBye = ''
             if (!('sPromote' in group)) group.sPromote = ''
             if (!('sDemote' in group)) group.sDemote = ''
             if (!('member' in group)) group.member = {}
             if (!isNumber(group.expired)) group.expired = 0
             if (!isNumber(group.onlyNumber)) group.onlyNumber = 62
        } else {
            global.db.data.group.push({
                jid: m.chat,
                activity: 0,
                autoread: true,
                welcome: true,
                detect: true,
                only: false,
                antidelete: false,
                antilink: false,
                antivirtex: false,
                filter: false,
                left: false,
                localonly: false,
                mute: false,
                stay: false,
                sWelcome: '',
                sBye: '',
                sPromote: '',
                sDemote: '',
                member: {},
                expired: 0,
                onlyNumber: 62
            })
        }
    }
    let settings = global.db.data.settings[conn.user.jid]
    if (typeof settings !== 'object') global.db.data.settings[conn.user.jid] = {}
    if (settings) {
        if (!('autodownload' in settings)) settings.autodownload = true
      	if (!('debug' in settings)) settings.debug = false
        if (!('chatbot' in settings)) settings.chatbot = true
        if (!('filter' in settings)) settings.filter = false
        if (!('error' in settings)) settings.error = []
        if (!('pluginDisable' in settings)) settings.pluginDisable = []
        if (!('groupmode' in settings)) settings.groupmode = false
        if (!'developerMode' in settings) settings.developerMode = true
        if (!('self' in settings)) settings.self = false
        if (!('mimic' in settings)) settings.mimic = []
        if (!('multiprefix' in settings)) settings.multiprefix = true
    } else global.db.data.settings[conn.user.jid] = {
        autodownload: true,
        chatbot: true,
        debug: false,
        filter: false,
        error: [],
        pluginDisable: [],
        groupmode: false,
        developerMode: true,
        self: false,
        mimic: [],
        multiprefix: true
    }
}

global.set.dfail = async (type, m, conn) => {
    let msg = {
        rowner: `Perintah Ini Hanya Untuk @${set.owner[0][0]}`,
        owner: `Perintah Ini Hanya Untuk @${set.owner[0][0]}`,
        mods: `Perintah Ini Hanya Untuk *Moderator*`,
        moderator: `Perintah Ini Hanya Untuk *Moderator*`,
        prems: `Perintah Ini Hanya Untuk Pengguna *Premium*`,
        premium: `Perintah Ini Hanya Untuk Pengguna *Premium*`,
        group: `Perintah Ini Hanya Dapat Digunakan Di Dalam *Grup*`,
        private: `Perintah Ini Hanya Dapat Digunakan Di *Chat Pribadi* @${conn.user.jid.split('@')[0]}`,
        admin: `Perintah Ini Hanya Untuk *Admin* Grup`,
        botAdmin: `Perintah Ini Aktif Ketika *Bot* Menjadi *Admin*`,
        mature: `Fitur *DEWASA* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        nsfw: `Fitur *NSFW* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        game: `Fitur *GAME* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        rpg: `Fitur *RPG* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        download: `Fitur *Downloader* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
        restrict: `Fitur *Admin* Tidak Aktif Silahkan Hubungi @${set.owner[0][0]} Untuk Mengaktifkannya`,
    }[type]
    if (msg) return conn.reply(m.chat, "\n*───「 ACCESS DENIED 」───*\n\n" + msg, m, { mentions: conn.parseMention(msg) })
    let unreg = { 
        unreg: `Verifikasi nomor dengan menggunakan email, 1 email untuk memverifikasi 1 nomor WhatsApp. Silahkan ikuti step by step berikut :

– *STEP 1*
Gunakan perintah *reg <email>* untuk mendapatkan kode verifikasi melalui email.
Contoh : *.reg ktdprjct@gmail.com*

– *STEP 2*
Buka email dan cek pesan masuk atau di folder spam, setelah kamu mendapat kode verifikasi silahkan kirim kode tersebut kepada bot dengan cara :
Contoh : *.otp 743675*

*Note* :
Kamu tidak akan bisa menggunakan bot pada private chat jika kamu tidak mendaftarkan emailmu pada database bot`
    }[type]
    if (unreg) return conn.sendMessage(m.chat, {
        text: unreg, contextInfo: { mentionedJid: [m.sender],
            externalAdReply: {
                title: set.wm,
                body: '',
                mediaType: 1,
                showAdAttribution: true,
                thumbnail: await (await fetch(set.imgAkses)).buffer(),
                thumbnailUrl: set.imgAkses,
                renderLargerThumbnail: true,
                sourceUrl: set.gc,
                mediaUrl: ``
                }
            }
        }, {quoted: m}
    )
}