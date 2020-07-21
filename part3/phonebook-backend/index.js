
require('dotenv').config()
const express = require('express')
const app = express()
const Entry = require('./models/entry')

const morgan = require('morgan')

morgan.token('log-body', function (req, res) {
  return JSON.stringify(req.body)}
)

const cors = require('cors')

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :log-body'))
app.use(cors())

  app.get('/api/persons', (req, res) => {
    Entry.find({}).then(entries => {
      res.json(entries) 
    })
  })

  app.get('/info', (req, res) => {
    Entry.count({}).then(num => {
      res.send(`<p>Phonebook has info for ${num} people</p>
    ${new Date()}`) 
    })  
  })

  app.get('/api/persons/:id', (req, res, next) => {
    Entry.findById(req.params.id)
      .then(entry => {
        if (entry) {
          res.json(entry)
        } else {
          res.status(404).end()
        } 
      })
      .catch(error => next(error))
  })

  app.post('/api/persons', (req, res, next) => {
      const body = req.body
      const entry = new Entry({
        name: body.name,
        number: body.number,
      })

      entry.save().then(savedEntry => {
        res.json(savedEntry)
      })
      .catch(error => next(error))
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

  app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body
    const entry = {
      number: body.number,
    }

    Entry.findByIdAndUpdate(req.params.id, entry, { new: true, runValidators: true, context: 'query' })
      .then(updatedEntry => {
        if (updatedEntry === null) {
          return res.status(404).send({error: `${body.name} was already deleted from server`})
        }
        res.json(updatedEntry)
      })
      .catch(error => next(error))
  })

  const errorHandler = (error, req, res, next) => {
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  app.use(errorHandler)

  const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
