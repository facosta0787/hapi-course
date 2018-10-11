'user strict'

const Boom = require('boom')
const UserModel = require('../models/index').user

async function createUser (req, h) {
  let result
  try {
    result = await UserModel.create(req.payload)
  } catch(error){
    console.error(error)
    return h.view('register', {
      title: 'Registro',
      error: 'Error creando el usuario'
    })
  }

  return h.view('register', {
    title: 'Registro',
    success: 'Usuario creado con exito'
  })
}

async function validateUser (req, h) {
  let result
  try {
    result = await UserModel.validate(req.payload)
    if(!result) {
      return h.view('login', {
        title: 'Login',
        error: 'Email y/o contraseña incorrecta'
      })
    }
  } catch(error) {
    console.error(error)
    return h.view('login', {
      title: 'Login',
      error: 'Problemas validando el usuario'
    })
  }

  return h.redirect('/').state('user', {
    name: result.name,
    email: result.email
  })
}

function logout (req, h) {
  return h.redirect('/login').unstate('user')
}

function failValidation(req, h, error) {
  const templates = {
    '/create-user': 'register',
    '/validate:user': 'login'
  }

  return h.view(templates[req.path], {
    title: 'Error de Validacion',
    error: 'Por favor complete los campos requeridos'
  }).code(400).takeover() //takeover() -> envia inmediatamente la respuesta sin pasar
  // por los otros metodos del ciclo de vida
}


module.exports = {
  createUser,
  validateUser,
  logout,
  failValidation
}