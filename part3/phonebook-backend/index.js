//////////////////////////////////////////////////
//////   3.5: Phonebook backend step5
//////////////////////////////////////////////////

const express = require('express')
const app = express()

app.use(express.json())

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

  app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
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
    const newId = Math.floor(Math.random() * 10000)
    const person = req.body
    person.id = newId

    persons = persons.concat(person)
  
    res.json(person)
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    res.status(204).end()
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })


//////////////////////////////////////////////////
//////   3.4: Phonebook backend step4
//////////////////////////////////////////////////
/* 
const express = require('express')
const app = express()

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

  app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
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

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
  
    res.status(204).end()
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
 */

//////////////////////////////////////////////////
//////   3.3: Phonebook backend step3
//////////////////////////////////////////////////
/* 
const express = require('express')
const app = express()

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

  app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
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

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
 */

//////////////////////////////////////////////////
//////   3.2: Phonebook backend step2
//////////////////////////////////////////////////
/* 
const express = require('express')
const app = express()

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

  app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/info', (req, res) => {
      const numPersons = persons.length
      res.send(`<p>Phonebook has info for ${numPersons} people</p>
      ${new Date()}`)
      
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
 */

//////////////////////////////////////////////////
//////   3.1: Phonebook backend step1
//////////////////////////////////////////////////
/* 
const express = require('express')
const app = express()

//app.use(express.json())

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

  app.get('/', (req, res) => {
    res.send('<h1>Phonebook Backend</h1>')
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })
  

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  }) 
  */