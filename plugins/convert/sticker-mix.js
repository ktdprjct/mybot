const fetch = require('node-fetch')

let handler = async (m, { conn, text, args }) => {
if (!args[0]) throw 'Contoh penggunaan:\n\n*.emojimix 🤨&😣*'
   	let [emoji1, emoji2] = text.split`&`
		let anu = await (await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)).json()
		for (let res of anu.results) {
			conn.sendSticker(m.chat, anu.results, m, { packname: set.pack, author: set.auth, asSticker: true})		
		}
}
		
handler.help = ['emojimix']
handler.tags = ['sticker']
handler.command = /^(emojimix)$/i
handler.limit = true 
module.exports = handler
