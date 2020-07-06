//////////////////////////////////////////////////
//////   3.8: Phonebook backend step8
//////////////////////////////////////////////////

const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :log-body'))

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

  const generateID = () => newId = Math.floor(Math.random() * 10000)

  app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    const duplicateName = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())

    morgan.token('log-body', function() {
        return JSON.stringify(body)}
    )
   
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
     } else if (duplicateName) {
         return res.status(400).json({
             error: 'name must be unique'
         })
     }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

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
//////   3.7: Phonebook backend step7
//////////////////////////////////////////////////
/* 
const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.json())
app.use(morgan('tiny'))

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

  const generateID = () => newId = Math.floor(Math.random() * 10000)

  app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    const duplicateName = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
     } else if (duplicateName) {
         return res.status(400).json({
             error: 'name must be unique'
         })
     }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

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
 */

//////////////////////////////////////////////////
//////   3.6: Phonebook backend step6
//////////////////////////////////////////////////
/* 
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

  const generateID = () => newId = Math.floor(Math.random() * 10000)

  app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)
    const duplicateName = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())
    
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
     } else if (duplicateName) {
         return res.status(400).json({
             error: 'name must be unique'
         })
     }

    const person = {
        name: body.name,
        number: body.number,
        id: generateID(),
    }

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
  }) */


//////////////////////////////////////////////////
//////   3.5: Phonebook backend step5
//////////////////////////////////////////////////
/* 
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
 */

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