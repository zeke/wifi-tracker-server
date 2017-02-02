const express = require('express')
const app = express()
const url = process.env.URL || 'https://wifi-tracker-server.herokuapp.com'
const port = Number(process.env.PORT) || 5000
const downloadUrl = 'https://github.com/zeke/wifi-tracker/releases/download'

app.set('port', port)

app.listen(app.get('port'), () => {
  console.log('Server is running on port', app.get('port'))
})

app.get('/', (request, response) => {
  response.send('Wifi Tracker Updates Server')
})

app.get('/updates/:asset', (request, response) => {
  const asset = request.params.asset
  const version = process.env.LATEST_WIFI_TRACKER_RELEASE
  response.redirect(`${downloadUrl}/v${version}/${asset}`)
})

app.get('/updates', (request, response) => {
  const version = request.query.version
  const latestRelease = process.env.LATEST_WIFI_TRACKER_RELEASE
  if (version === latestRelease) {
    response.status(204).end()
  } else {
    response.json({
      name: `Wifi Tracker v${latestRelease}`,
      notes: 'The latest version of Wifi Tracker',
      pub_date: new Date().toISOString(),
      url: `${url}/updates/wifi-tracker-darwin-x64.zip`
    })
  }
})
