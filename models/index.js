'use strict'

const firebase = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://platzioverflow-79c61.firebaseio.com/'
})

const db = firebase.database()
const User = require('./user')
const Question = require('./question')

module.exports = {
  user: new User(db),
  question: new Question(db)
}