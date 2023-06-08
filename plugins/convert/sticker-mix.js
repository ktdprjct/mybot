const fetch = require('node-fetch')
const { Sticker: createSticker, StickerTypes } = require("wa-sticker-formatter");

let handler = async (m, { conn, text, args }) => {
    if (!args[0]) throw 'Contoh penggunaan:\n\n*.emojimix 🤨.😣*'
       	let [emoji1, emoji2] = text.split`.`
    		let anu = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}&${encodeURIComponent(emoji2)}`)).json()
    		for (let res of anu.results) {
    			//conn.sendSticker(m.chat, anu.results, m, { packname: set.pack, author: set.auth, asSticker: true})
    			let sticker = new createSticker(anu.results, {
                    pack: global.set.pack,
                    author: global.set.auth,
                    type: StickerTypes.FULL,
                    quality: 50,
                });
                return conn.reply(await sticker.toMessage());
    		}
}
		
handler.help = ['emojimix']
handler.tags = ['sticker']
handler.command = /^(s|emoji(mix))$/i
handler.limit = true
handler.register = true

module.exports = handler