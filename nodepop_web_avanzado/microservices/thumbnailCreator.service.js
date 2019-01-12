'use strict'

const cote = require('cote')
var jimp = require('jimp')

const responder = new cote.Responder({
  name: 'thumbnail creator responder'
}, { log: false, statusLogsEnabled: false })

const appendSuffix = (fileName, suffix) => {
  const dotPos = fileName.lastIndexOf('.')
  return fileName.substr(0, dotPos) + suffix + fileName.substr(dotPos)
}

// image: string with image path
responder.on('createThumbnail', async req => {
  const srcImagePath = req.image
  const dstImagePath = appendSuffix(srcImagePath, '_thumbnail')

  console.log(`Creating thumbnail ${dstImagePath}...`)

  const image = await jimp.read(req.image)
  return image
    .scaleToFit(100, 100)
    .write(dstImagePath)
})
