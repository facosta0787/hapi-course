'user strict'

const Hapi = require('hapi')
const handlebars = require('handlebars')
const vision = require('vision')
const inert = require('inert')
const path = require('path')
const routes = require('./routes')
const site = require('./controllers/site')


const server = Hapi.server({
  port: process.env.PORT || 3000,
  host: 'localhost',
  routes: {
    files: {
      relativeTo: path.join(__dirname, 'public')
    }
  }
})

async function init() {
  try {
    await server.register(inert)
    await server.register(vision)

    server.state('user', {
      ttl: 1000 * 60 * 60 * 24 * 7, // time to leave por una semana
      isSecure: process.env.NODE_ENV === 'prod',
      encoding: 'base64json'
    })

    server.views({
      engines: {
        hbs: handlebars
      },
      relativeTo: __dirname,
      path: 'views',
      layout: true,
      layoutPath: 'views'
    })

    server.ext('onPreResponse', site.fileNotFound)
    server.route(routes)

    await server.start()
  } catch(error) {
    console.error(error)
    process.exit(1)
  }

  console.log(`Server running on: ${server.info.uri}`)
}

// process.on('unhandledRejection', error => {
//   console.error('unhandledRejection', error.message)
// })

// process.on('uncaughtException', error => {
//   console.error('uncaughtException', error.message)
// })

init()