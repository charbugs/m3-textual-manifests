const path = require('path')
const express = require('express')
var cors = require('cors')

const app = express()
const port = 8081

app.use(cors(), express.static(path.join(__dirname, '../public')));
app.listen(port, () => console.log(`server listens on port ${port}!`))