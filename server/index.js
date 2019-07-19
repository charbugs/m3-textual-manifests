//const manifest = require('../assets/iiif/text-1/manifest.json')

const path = require('path')
const express = require('express')
var cors = require('cors')


// when running on heroku we use env variables for setup
const port = process.env.PORT || 8080
const home = process.env.APP_HOME || 'http://localhost:8080'

const app = express()

console.log(process.env, port, home)



app.use(cors(), express.static(path.join(__dirname, '../public')));
app.listen(port, () => console.log(`server listens on port ${port}!`))