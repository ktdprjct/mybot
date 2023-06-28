let { h5tuqq } = require("@xct007/frieren-scraper")
let { TelegraPh } = require('../../lib/uploader')
let handler = async (m,{ conn }) => {
    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || ''
    let download = await q.download()
    if (/image/g.test(mime)) {
        let link = await TelegraPh(download)
        let h5qq = await h5tuqq(link)
    } else throw "mana gambarnya?"
}