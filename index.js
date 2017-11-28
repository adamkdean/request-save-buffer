'use strict'

const fs = require('fs')
const request = require('request')
const through2 = require('through2')
const streamBuffers = require('stream-buffers')

const stream = new streamBuffers.WritableStreamBuffer()
const url = 'http://www.guoguiyan.com/data/out/113/69175307-large-wallpapers.jpeg'
const outputFile = 'output.jpg'
const req = request({ url })

req.pipe(through2((chunk, encoding, done) => {
  console.log(`chunk (${chunk.length})`, chunk)
  stream.write(chunk)
  done()
}))

req.on('end', () => {
  const contents = stream.getContents()
  console.log(`contents (${contents.length})`, contents)
  
  fs.writeFile(outputFile, contents, (err) => {
    if (err) return console.log('error writing file')
    console.log(`${outputFile} written`)
  })
})