//////////////////////////////////////////
/////// 3.12: Command-line database
//////////////////////////////////////////

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} 

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.kk7vy.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
  name: String,
  number: String
})

const Entry = mongoose.model('Entry', entrySchema)

const entry = new Entry({
  name: `${name}`,
  number: `${number}`
})

if (process.argv.length === 3) {
    Entry.find({}).then(result => {
        result.forEach(entry => {
        console.log(entry) 
        }) 
        process.exit(0) 
    })
}

entry.save().then(result => {
  console.log(`added ${name} number ${number} to phonebook`)
  mongoose.connection.close()
})