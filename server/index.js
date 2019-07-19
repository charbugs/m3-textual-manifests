//const manifest = require('../assets/iiif/text-1/manifest.json')

const path = require('path')
const express = require('express')
var cors = require('cors')

const app = express()

// on heroku use process.env.PORT
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8080;
}

app.use(cors(), express.static(path.join(__dirname, '../public')));
app.listen(port, () => console.log(`server listens on port ${port}!`))