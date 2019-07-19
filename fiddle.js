const fs = require('fs')



const loadFile = (path) => new Promise(resolve => 
  fs.readFile(path, 'utf8', (err, data) => resolve(data)))

const resolveHostnames = (text) => 
  text.replace(/<hostname>/g, hostname)

const sendResource = (path, response) => 
  loadFile(path).then(resolveHostnames).then(JSON.parse).then(response.send)



const manifestPath = '/home/mathias/github/m3-textual-manifests/assets/iiif/text-1/manifest.json'

loadFile(manifestPath)
  .then(console.log)
