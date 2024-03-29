const syntaxerror = require('syntax-error')
const util = require('util')
const fetch = require('node-fetch')
const axios = require('axios')
const fs = require('fs')
const bocil = require('@bochilteam/scraper')
const scrape = require('../../lib/scrape.js')

let handler  = async (m, _2) => {
  let { conn, usedPrefix, command, text, noPrefix, args, groupMetadata, participants, expiration } = _2
  let _return
  let _syntax = ''
  let _text = (/^~/.test(usedPrefix) ? 'return ' : '') + noPrefix
  let old = m.exp * 1 
  try {
    let i = 15
    let f = {
      exports: {}
    }
    let exec = new (async () => {}).constructor('print', 'm', 'handler', 'require', 'conn', 'Array', 'process', 'args', 'groupMetadata', 'expiration', 'axios', 'fs', 'fetch', 'bail', 'bocil', 'scrape', 'module', 'exports', 'argument', _text)
    _return = await exec.call(conn, (...args) => {
      if (--i < 1) return
      console.log(...args)
      return conn.reply(m.chat, util.format(...args), m)
    }, m, handler, require, conn, CustomArray, process, args, groupMetadata, expiration, axios, fs, fetch, bocil, scrape, f, f.exports, [conn, _2])
  } catch (e) {
    let err = await syntaxerror(_text, 'Execution Function', {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true
    })
    if (err) _syntax = '```' + err + '```\n\n'
    _return = e
  } finally {
    conn.reply(m.chat, _syntax + util.format(_return), m)
    m.exp = old
  }
}
handler.help = ['>', '~>']
handler.tags = ['owner']
handler.customPrefix = /^~?> /
handler.command = /(?:)/i
handler.rowner = true
module.exports = handler

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == 'number') return super(Math.min(args[0], 10000))
    else return super(...args)
  }
}
