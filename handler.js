const { performance } = require('perf_hooks')
const simple = require('./lib/simple')
const util = require('util')
const fs = require('fs')
const fetch = require('node-fetch')
const chalk = require('chalk')
const moment = require('moment-timezone')
const isNumber = x => typeof x === 'number' && !isNaN(x)
const readMore = String.fromCharCode(8206).repeat(4001)

module.exports = {
    async handler(chatUpdate) {
        if (global.db.data == null) await global.loadDatabase()
        this.msgqueque = this.msgqueque || []
        if (!chatUpdate) return
        if (chatUpdate.messages.length > 1) console.log(chatUpdate.messages)
        let m = chatUpdate.messages[chatUpdate.messages.length - 1]
        if (!m) return
        const Tnow = (new Date()/1000).toFixed(0)
        const sel = Tnow - m.messageTimestamp
        if (sel > global.Intervalmsg) return console.log(new ReferenceError(`Pesan ${Intervalmsg} detik yang lalu diabaikan agar tidak spam`))
        try {
            m = simple.smsg(this, m) || m
            if (!m) return
            m.exp = 0
            m.limit = false
            try {
                require('./system/database') (m, this)
            } catch (e) {
                console.error(e)
            }
            
            const isROwner = [this.user.jid, ...set.owner.map(([number]) => number)].map(v => v?.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)      
            if (set.opts['nyimak']) return
            if (set.opts['self'] && !isROwner) return
            if (set.opts['pconly'] && !m.chat.endsWith('s.whatsapp.net')) return
            if (set.opts['gconly'] && !m.chat.endsWith('g.us')) return
            if (set.opts['swonly'] && m.chat !== 'status@broadcast') return
            if (typeof m.text !== 'string') m.text = ''
            if (set.opts['queque'] && m.text) {
                this.msgqueque.push(m.id || m.key.id)
                await delay(this.msgqueque.length * 1000)
            }
            const groupSet = global.db.data.group.find(v => v.jid)
            
            if (m.isGroup && !m.fromMe) {
                let now = new Date() * 1
                if (!groupSet.member[m.sender]) {
                    groupSet.member[m.sender] = {
                        lastseen: now,
                        warning: 0
                    }
                } else {
                    groupSet.member[m.sender].lastseen = now
                }
            }
            
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                if (!plugin.all) continue
                if (typeof plugin.all !== 'function') continue
                try {
                    await plugin.all.call(this, m, chatUpdate)
                } catch (e) {
                    if (typeof e === 'string') continue
                    console.error(e)
                }
            }
            if (m.isBaileys) return
            m.exp += Math.ceil(Math.random() * 10)
            
            let usedPrefix
            let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]
            
            let isOwner = isROwner || m.fromMe
            let isMods = isOwner || set.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let isPrems = isROwner || set.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
            let groupMetadata = (m.isGroup ? ((this.chats[m.chat] || {}).metadata || await this.groupMetadata(m.chat).catch(_ => null)) : {}) || {}
            let ownerGroup = (m.isGroup ? groupMetadata.owner : []) || []
            let participants = (m.isGroup ? groupMetadata.participants : []) || []
            let user = (m.isGroup ? participants.find(u => this.decodeJid(u.id) === m.sender) : {}) || {} // User Data
            let bot = (m.isGroup ? participants.find(u => this.decodeJid(u.id) == this.user.jid) : {}) || {} // Your Data
            let isRAdmin = user && user?.admin == 'superadmin' || false // Is User Super Admin?
            let isAdmin = user && user?.admin == 'admin' || false // Is User Admin?
            let isBotAdmin = bot && bot?.admin || false // Are you Admin?
            
            for (let name in global.plugins) {
                let plugin = global.plugins[name]
                if (!plugin) continue
                if (plugin.disabled) continue
                
                const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
                let _prefix = plugin.customPrefix ? plugin.customPrefix : this.prefix ? this.prefix : set.prefix
                let match = (_prefix instanceof RegExp ? // RegExp Mode?
                    [[_prefix.exec(m.text), _prefix]] :
                    Array.isArray(_prefix) ? // Array?
                        _prefix.map(p => {
                            let re = p instanceof RegExp ? // RegExp in Array?
                                p :
                            new RegExp(str2Regex(p))
                            return [re.exec(m.text), re]
                        }) :
                    typeof _prefix === 'string' ? // String?
                    [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]] :
                    [[[], new RegExp]]
                ).find(p => p[1]) 
                const expiration = m.msg?.contextInfo?.expiration
                if (typeof plugin.before === 'function') if (await plugin.before.call(this, m, {
                    match,
                    conn: this,
                    ownerGroup,
                    participants,
                    groupMetadata,
                    user,
                    bot,
                    isROwner,
                    isOwner,
                    isRAdmin,
                    isAdmin,
                    isBotAdmin,
                    isPrems,
                    chatUpdate,
                    expiration
                })) continue
                if (typeof plugin !== 'function') continue
                if ((usedPrefix = (match[0] || '')[0])) {
                    let noPrefix = m.text.replace(usedPrefix, '')
                    let [command, ...args] = noPrefix.trim().split` `.filter(v => v)
                        args = args || []
                    let _args = noPrefix.trim().split` `.slice(1)
                    let text = _args.join` `
                        command = (command || '').toLowerCase()
                    let fail = plugin.fail || set.dfail // When failed
                    let isAccept = plugin.command instanceof RegExp ? // RegExp Mode?
                        plugin.command.test(command) :
                    Array.isArray(plugin.command) ? // Array?
                    plugin.command.some(cmd => cmd instanceof RegExp ? // RegExp in Array?
                        cmd.test(command) :
                        cmd === command
                    ) :
                    typeof plugin.command === 'string' ? // String?
                    plugin.command === command :
                    false
                    
                    if (!isAccept) continue
                    m.plugin = name
                    if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
                        let chat = global.db.data.chats[m.chat]
                        let user = global.db.data.users[m.sender]
                        if (!['owner-unban.js', 'group-unban.js', 'info-listban.js', 'info-creator.js'].includes(name) && chat && chat?.isBanned && !isPrems) return // Kecuali ini, bisa digunakan
                        if (!['owner-unban.js', 'group-unban.js', 'info-listban.js', 'info-creator.js'].includes(name) && user && user?.banned) return
                    }
                    
                    if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Both Owner
                        fail('owner', m, this)
                        continue
                    }
                    
                    if (plugin.rowner && !isROwner) { // Real Owner
                        fail('rowner', m, this)
                        continue
                    }
                    
                    if (plugin.owner && !isOwner) { // Owner UserJid
                        fail('owner', m, this)
                        continue
                    }
                    
                    if (plugin.mods && !isMods) { // Moderator
                        fail('mods', m, this)
                        continue
                    }
                    
                    if (plugin.premium && !isPrems) { // Premium
                        fail('premium', m, this)
                        continue
                    }
                    
                    if (plugin.group && !m.isGroup) { // Group Only
                        fail('group', m, this)
                        continue
                    } else if (plugin.botAdmin && !isBotAdmin) { // You Admin
                        fail('botAdmin', m, this)
                        continue
                    } else if (plugin.admin && !isAdmin && isROwner) { // User Admin
                        fail('admin', m, this)
                        continue
                    }
                    
                    if (plugin.restrict && !m.fromOwner && !opts['restrict']) { // Restrict
                        fail('restrict', m, this)
                        continue
                    }
                    
                    if (plugin.private && m.isGroup) { // Private Chat Only
                        fail('private', m, this)
                        continue
                    }
                    
                    if (plugin.register == true && _user.registered == false) { // Need register?
                        if (!m.chat.endsWith('g.us')) return fail('unreg', m, this)
                        continue
                    }
                    
                    if (plugin.desc && text.includes('-h')) { //Plugin description 
                        m.reply(plugin.desc.toString())
                        continue 
                    }
                    
                    m.isCommand = true
                    let xp = 'exp' in plugin ? parseInt(plugin.exp) : 17 // XP Earning per command
                    if (xp > 200) m.reply('Ngecit -_-') // Hehehe
                    else m.exp += xp
                    if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                        this.sendButton(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, wm, 0, [['Buy', '.buy1']], m)
                        // this.reply(m.chat, `Limit anda habis, silahkan beli melalui *${usedPrefix}buy*`, m)
                        continue // Limit habis
                    }
                    
                    if (plugin.level > _user.level) {
                        this.sendButton(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, wm, 0, [['Levelup', '.levelup']], m)
                        // this.reply(m.chat, `diperlukan level ${plugin.level} untuk menggunakan perintah ini. Level kamu ${_user.level}`, m)
                        continue // If the level has not been reached
                    }
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        command,
                        text,
                        conn: this,
                        ownerGroup,
                        participants,
                        groupMetadata,
                        user,
                        bot,
                        isROwner,
                        isRAdmin,
                        isOwner,
                        isAdmin,
                        isBotAdmin,
                        isPrems,
                        chatUpdate,
                        expiration
                    }
                    try {
                        //if (!global.db.data.users[m.sender].registered && !m.chat.endsWith('g.us')) return this.reply(m.chat, "tes", m)
                        
                        await plugin.call(this, m, extra)
                        if (!isPrems) m.limit = m.limit || plugin.limit || false
                    } catch (e) {
                        // Error occured
                        m.error = e
                        console.error(e)
                        if (e) {
                            let text = util.format(e)
                            for (let key of Object.values(set.api.key.s))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                            if (e.name) {
                                let devmode = db.data.settings[this.user.jid].developerMode
                                let tekk = `*ERROR!*\n\nPesan : ${m.text}\n\n\n\n*Plugin:* ${m.plugin}\n*Sender:* @${m.sender.split`@`[0]}\n*Chat:* ${m.chat}\n*Chat Name:* ${await this.getName(m.chat)}\n*Command:* ${usedPrefix + command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``
                                if (devmode) return this.reply('62895323071410@s.whatsapp.net', tekk, m, { mentions: this.parseMention(tekk) })
                                    .then(_=> m.react('❌') ).then(_=> m.reply('Maaf terjadi kesalahan!'))
                                else return this.reply(m.chat, text, m)
                            }
                            //let emror = `_*ERROR!_*\n\nPesan : ${text}\n\n\n\n*Plugin:* ${m.plugin}\n*Sender:* @${m.sender.split`@`[0]}\n*Chat:* ${m.chat}\n*Chat Name:* ${await this.getName(m.chat)}\n*Command:* ${usedPrefix + command} ${args.join(' ')}\n\n\`\`\`${text}\`\`\``
                            m.react('⁉️').then(_=> m.reply(text, m.chat, { mentions: this.parseMention(text)}))
                                //.then(_=> this.reply('62895323071410@s.whatsapp.net', emror, m, { mentions: this.parseMention(emror) }))
                            // .then(_=> this.sendHydrated(m.chat, text, set.wm, null, null, null, 'https://www.whatsapp.com/otp/copy/' + usedPrefix  + command, 'Copy Command', [[]]))            
                        }
                    } finally {
                        if (typeof plugin.after === 'function') {
                            try {
                                await plugin.after.call(this, m, extra)
                            } catch (e) {
                                console.error(e)
                            }
                        }
                        // if (m.limit) m.reply(+ m.limit + ' Limit terpakai')
                        //jika risih matiin aja 
                    }
                    break
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            let user, stats = global.db.data.stats
            if (m) {
                if (m.sender && (user = global.db.data.users[m.sender])) {
                    user.exp += m.exp
                    user.limit -= m.limit * 1
                }
                let stat
                if (m.plugin) {
                    let now = + new Date
                    if (m.plugin in stats) {
                        stat = stats[m.plugin]
                        if (!isNumber(stat.total)) stat.total = 1
                        if (!isNumber(stat.success)) stat.success = m.error != null ? 0 : 1
                        if (!isNumber(stat.last)) stat.last = now
                        if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
                    } else stat = stats[m.plugin] = {
                        total: 1,
                        success: m.error != null ? 0 : 1,
                        last: now,
                        lastSuccess: m.error != null ? 0 : now
                    }
                    stat.total += 1
                    stat.last = now
                    if (m.error == null) {
                        stat.success += 1
                        stat.lastSuccess = now
                    }
                }
            }
            try {
                require('./lib/print')(m, this)
            } catch (e) {
                console.log(m, m.quoted, e)
            }        
            let quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            if (set.opts['queque'] && m.text && quequeIndex !== -1) this.msgqueque.splice(quequeIndex, 1)           
        }
    },

    async participantsUpdate(update) {
        const { id, participants, action } = update
        if (set.opts['self']) return
        if (this.isInit) return
        if (global.db.data == null) await global.loadDatabase()
        let chat = global.db.data.group.find(v => v.jid == id)
        let ppimut = 'https://telegra.ph/file/118a75cb0c8396bdd7975.jpg'
        let ppgc = 'https://telegra.ph/file/45315c8cc2cceb27ab81b.png'
        let text = ''
        switch (action) {
            case 'add':
            case 'remove':
                if (chat.welcome) {
                    const groupMetadata = await this.groupMetadata(id)
                    for (let user of participants) {
                        let name = this.getName(user)
                        let pp = await this.profilePictureUrl(id, 'image').catch(_=> ppgc)
                        text = (action === 'add' ? (chat.sWelcome || this.welcome || conn.sWelcome || 'Hi, @user 👋\nWelcom in group').replace('@subject', groupMetadata.subject).replace('@desc', groupMetadata.desc?.toString() || '') :
                        (chat.sBye || this.bye || conn.sBye || 'Bye, @user!')).replace('@user', '@' + user.split('@')[0])
                        if (action === 'add') {
                            if (user.includes(this.user.jid)) return this.reply(id, `Hello everyone 👋\n\nSaya adalah *${this.user.name}* Bot WhatsApp yang akan membantu kamu mempermudah sesuatu seperti membuat stiker dan lainnya, untuk menggunakan fitur bot silahkan ketik *#menu*`,                 
                            fake.contact(parseInt(user), name), {
                                ephemeralExpiration: 86400,
                                contextInfo: {
                                    mentionedJid: groupMetadata.participants.map(v => v.id),
                                    externalAdReply :{
                                        showAdAttribution: true,
                                        mediaType: 1,
                                        title: set.wm, 
                                        thumbnail: await this.getBuffer(pp),
                                        renderLargerThumbnail: true,
                                        sourceUrl: 'https://chat.whatsapp.com/CUCsW6BWfmJLJwJgPQIaKM'
                                    }
                                }
                            })                       
                            if (chat.only) {
                                if (!user.startsWith(chat.onlyNumber)) return this.reply(id, `Sorry @${parseInt(user)} this group is only for people *+${db.data.chats[id].onlyNumber}* you will be removed from this group.\n\n                *Goodbye! 👋*\n`, null, { mentions: [user] })
                                .then(async _=> {
                                    await this.groupParticipantsUpdate(id, [user], "remove")
                                })
                            }
                        }
                        this.reply(id, text, fake.contact(parseInt(user)), {
                            ephemeralExpiration: 86400,
                            contextInfo: {
                                mentionedJid: [user],
                                externalAdReply :{
                                    showAdAttribution: true,
                                    mediaType: 1,
                                    title: set.wm, 
                                    thumbnail: await this.getBuffer(pp),
                                    renderLargerThumbnail: true,
                                    sourceUrl: ''
                                }
                            }
                        })
                    }
                }
            break
            
            case 'promote':
            case 'demote':
                for (let user of participants) {
                    text = (chat.sPromote || this.sPromote || conn.sPromote || '@user ```is now Admin```')          
                    if (!text) text = (chat.sDemote || this.sDemote || conn.sDemote || '@user ```is no longer Admin```')
                    text = text.replace('@user', '@' + participants[0].split('@')[0])
                    if (chat.detect) {
                        let ucap = action === 'promote' ? participants[0] === this.user.jid ? 'Gk sia" jadi bot naik jabatan juga di grup wkwk' : 'Uhm...\nada yg naik jabatan nih' : 'Awikwok ada yg turun tahta:V'
                        let pp = await this.profilePictureUrl(participants[0], 'image').catch(_=> ppgc)
                        this.reply(id, text, fake.text(ucap), { mentions: [user] })
                    } else this.reply(id, action === 'promote' ? 'Uhm...' : 'wkwk', fake.text(action === 'promote' ? 'Uhm bau" ada yg naik jabatan nih': 'Ada yg turun tahta:v'))
                }
            break
        }
    },
    
    async groupsUpdate(update) {
        // console.log(update)
        if (set.opts['self']) return
        if (this.isInit) return
        for (let groupUpdate of update) {
            let id = groupUpdate.id
            if (!id) continue
            let chats = db.data.chats[id], text = ''
            let hid = await this.groupMetadata(id)
            let member = hid.participants.map(v => v.id)
            if (!chats.detect) continue
            if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
            if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
            if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
            if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
            if (groupUpdate.announce == true) text = (chats.sAnnounceOn || this.sAnnounceOn || conn.sAnnounceOn || '```Group has been closed!```')
            if (groupUpdate.announce == false) text = (chats.sAnnounceOff || this.sAnnounceOff || conn.sAnnounceOff || '```Group has been open!```')
            if (groupUpdate.restrict == true) text = (chats.sRestrictOn || this.sRestrictOn || conn.sRestrictOn || '```Group has been only admin!```')
            if (groupUpdate.restrict == false) text = (chats.sRestrictOff || this.sRestrictOff || conn.sRestrictOff || '```Group has been all participants!```')
            if (!text) continue
            this.sendHydrated(id, "\n               *「 DETECTION 」*\n\n" + text, set.wm, set.fla + 'detection', 0, 0, 'https://www.whatsapp.com/otp/copy/bit.ly/bit.ly/AcellComel', 'Tutorial Prank Orang 😎', [[]], null, { asLocation: true, mentions: member })
        }
    },
	
    async delete(update) {
        try {
        // console.log(update)
            let { remoteJid, fromMe, id, participant } = update
            if (set.opts['self'] && fromMe) return
            if (this.isInit) return
            if (db.data == null) await global.loadDatabase()
            let chats = Object.entries(await this.chats).find(([user, data]) => data.messages && data.messages[id])
            if (!chats) return
            let msg = JSON.parse(JSON.stringify(chats[1].messages[id]))
            let chat = global.db.data.chats[remoteJid]
            let nama = pickRandom(['apaan', 'galiat', 'hehe', 'hihi', 'hm', 'kyubi', 'makan', 'mana', 'seduh', 'smile', 'xixi'])
            let stiker = fs.readFileSync('./api/sticker/' + nama + '.webp')
            if (!chat.antidelete) return this.sendFile(remoteJid, stiker, 'delete.webp', '', msg)			
            this.sendFile(remoteJid, stiker, 'hayo.webp', '', msg).then(_=> this.copyNForward(remoteJid, msg).catch(e => console.log(e, msg)))
        } catch {}
    },
    
    async onCall(json) {
	    console.log(json.content[0])
        if (set.opts['self']) return 
        if (this.isInit) return
        if (global.db.data == null) await global.loadDatabase() 
        if (!glonal.db.data.settings[this.user.jid].anticall) return
	    let [data] = json
        let { from, isGroup, isVideo, date, status} = data
        if (isGroup) return
        if (json.content[0].tag == 'offer') { 
            let typeCall = json.content[0].content[0].tag
            let callerId = json.content[0].attrs['call-creator']
            let user = db.data.users[callerId]
            if (user.whitelist) return
            switch (this.callWhitelistMode) {
                case 'mycontact':
                    if (callerId in this.contacts && 'short' in this.contacts[callerId]) return
                break
            }
            let kontakk = [
                [
                    `${set.owner[0][0]}`, 
                    `${this.getName(set.owner[0][0] + '@s.whatsapp.net')}`,
                    `👑 Developer Bot `,
                    `🚫 Don't call me 🥺`, 
                    `Not yet`,
                    `🇮🇩 Indonesia`,
                    `Mampus kena block makanya jangan asal nelpon" 🗿`,
                    `Folllow ig @rasel.ganz for open blocked`
                ], 
                [
                    `0`, 
                    `${this.getName('0@s.whatsapp.net')}`,
                    `🔥 Suhu 🔥`,
                    `Kang banned bot ilegal 😎`,
                    `whatsapp@gmail.com`,
                    `Cari sendiri`, 
                    `https://whatsapp.com`,
                    `Empat sehat le mark sempurna 👌🗿`
                ]
            ]
            user.call += 1
            if (user.call == 5) {
                let sentMsg = await this.sendContactArray(callerId, kontakk)
                this.reply(callerId, `Sistem auto block, jangan menelepon bot silahkan hubungi owner untuk dibuka!`, sentMsg).then(_=> {
                this.updateBlockStatus(callerId, 'block')})
                .then(_=> {
                    user.call = 0
                }).then(_=> {
                    this.reply(owner[0][0] + '@s.whatsapp.net', `*NOTIF CALLER BOT!*\n\n@${callerId.split`@`[0]} telah menelpon *${this.user.name}*\n\n ${callerId.split`@`[0]}\n`, null, { mentions: [callerId] })
                })
            } else this.sendHydrated(callerId, `Maaf tidak bisa menerima panggilan, Jika kamu menelepon lebih dari 5, kamu akan diblokir.\n\n${user.call} / 5`, wm, fla + "don't call", null, null, null, null, [[null, null]], null, { asLocation: true })
        }
    }
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    delete require.cache[file]
    if (global.reloadHandler) console.log(global.reloadHandler())
})

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}