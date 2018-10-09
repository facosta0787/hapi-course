'user strict'

const UserModel = require('../models/index').user

async function createUser (req, h) {
  let result
  try {
    result = await UserModel.create(req.payload)
  } catch(error){
    console.error(error)
    return h.response('Error creating user').code(500)
  }

  return h.response(`Usuaerio creado ID: ${result}`)
}

async function validateUser (req, h) {
  let result
  try {
    result = await UserModel.validate(req.payload)
    if(!result) {
      return h.response('Email y/o contraseña incorrecta').code(401)
    }
  } catch(error) {
    console.error(error)
    return h.response('Error validando user').code(500)
  }

  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function logout (req, h) {
  return h.redirect('/login').unstate('user')
}

module.exports = {
  createUser,
  validateUser,
  logout
}