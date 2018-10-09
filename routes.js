'user strict'

const joi = require('joi')
const site = require('./controllers/site')
const user = require('./controllers/user')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: site.home
  },
  {
    method: 'GET',
    path: '/register',
    handler: site.register
  },
  {
    method: 'POST',
    path: '/create-user',
    options: {
      validate: {
        payload: {
          name: joi.string().min(3).required(),
          email: joi.string().email().required(),
          password: joi.string().min(6).required()
        }
      }
    },
    handler: user.createUser
  },
  {
    method: 'GET',
    path: '/login',
    handler: site.login
  },
  {
    method: 'GET',
    path: '/logout',
    handler: user.logout
  },
  {
    method: 'POST',
    path: '/validate-user',
    options: {
      validate: {
        payload: {
          email: joi.string().email().required(),
          password: joi.string().min(6).required()
        }
      }
    },
    handler: user.validateUser
  },
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        index: ['index.html']
      }
    }
  }
]

module.exports = routes