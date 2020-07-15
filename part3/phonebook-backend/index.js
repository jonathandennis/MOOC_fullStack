//////////////////////////////////////////////////
//////   3.16: Phonebook database, step4
//////////////////////////////////////////////////

const express = require('express')
const app = express()
require('dotenv').config()

const morgan = require('morgan')

morgan.token('log-body', function (req, res) {
  return JSON.stringify(req.body)}
)

const Entry = require('../phonebook-backend/models/entry')

const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :log-body'))
app.use(cors())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 3
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    }
  ]

  app.get('/api/persons', (req, res) => {
    Entry.find({}).then(entries => {
      res.json(entries) 
    })
  })

  app.get('/info', (req, res) => {
    const numPersons = persons.length
    res.send(`<p>Phonebook has info for ${numPersons} people</p>
    ${new Date()}`)    
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      } 
  })

  app.post('/api/persons', (req, res) => {
      const body = req.body
      console.log('body:', body)

      if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
      }

      const entry = new Entry({
        name: body.name,
        number: body.number,
      })

      entry.save().then(savedEntry => {
        res.json(savedEntry)
      })
  })

  app.delete('/api/persons/:id', (req, res, next) => {
    Entry.findByIdAndRemove(req.params.id)
      .then(result => {
        if (result) {
          res.status(204).end()
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
  })

  const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


//////////////////////////////////////////////////
//////   3.15: Phonebook database, step3
//////////////////////////////////////////////////
/* 
const express = require('express')
const app = express()
require('dotenv').config()

const morgan = require('morgan')

morgan.token('log-body', function (req, res) {
  return JSON.stringify(req.body)}
)

const Entry = require('../phonebook-backend/models/entry')

const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :log-body'))
app.use(cors())

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 2
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 3
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 4
    }
  ]

  app.get('/api/persons', (req, res) => {
    Entry.find({}).then(entries => {
      res.json(entries) 
    })
  })

  app.get('/info', (req, res) => {
    const numPersons = persons.length
    res.send(`<p>Phonebook has info for ${numPersons} people</p>
    ${new Date()}`)    
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      } 
  })

  app.post('/api/persons', (req, res) => {
      const body = req.body
      console.log('body:', body)

      if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
      }

      const entry = new Entry({
        name: body.name,
        number: body.number,
      })

      entry.save().then(savedEntry => {
        res.json(savedEntry)
      })
  })

  app.delete('/api/persons/:id', (req, res, next) => {
    Entry.findByIdAndRemove(req.params.id)
      .then(result => {
        res.status(204).end()
      })
      .catch(err => next(error))
  })

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
*/