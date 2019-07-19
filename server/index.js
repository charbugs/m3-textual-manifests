const fs = require('fs')
const path = require('path')
const express = require('express')
var cors = require('cors')


// when running on heroku we use env variables for setup
const port = process.env.PORT || 8080
const hostname = process.env.APP_HOME || 'http://localhost:8080'
const assetsPath = path.resolve(__dirname, '../assets/')


const resolveAssetPath = (relative) => 
  Promise.resolve(path.resolve(assetsPath, relative))

const loadFile = (path) => 
  new Promise(resolve => fs.readFile(path, 'utf8', (err, data) => resolve(data)))

const resolveHostnames = (text) => 
  text.replace(/<hostname>/g, hostname)

const sendIIIF = (path, response) => 
  resolveAssetPath(path)
    .then(loadFile)
    .then(resolveHostnames)
    .then(JSON.parse)
    .then(json => response.json(json))

const sendHTML = (path, response) => 
  resolveAssetPath(path)
    .then(loadFile)
    .then(html => response.send(html))


const app = express()
app.use(cors());

app.get('/mirador', (req, res) => {
  sendHTML('mirador/index.html', res)
})

app.get('/mirador/bundle.js', (req, res) => {
  sendHTML('mirador/bundle.js', res)
})

app.get('/iiif/text-1/manifest', (req, res) => {
  sendIIIF('iiif/text-1/manifest.json', res)
})

app.get('/iiif/text-1/list/page-:page', (req, res) => {
  sendIIIF(`iiif/text-1/list/page-${req.params.page}.json`, res)
})

app.get('/iiif/text-1/text/page-:page', (req, res) => {
  sendHTML(`iiif/text-1/text/page-${req.params.page}.html`, res)
})


app.listen(port, () => console.log(`server listens on port ${port}!`))