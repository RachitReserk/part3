const express = require('express')
const app = express()
app.use(express.json())
const morgan = require('morgan')
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))

let Data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const utcDate1 = new Date(Date.now())


app.get('/api/persons',(request , response) => {
  response.json(Data)
})

app.get('/info',(request,response) =>{
    response.send(
        `<p>Phonebook has info for ${Data.length} 
        <br/>
        <br/>
        ${utcDate1.toUTCString()} ${utcDate1.getTimezoneOffset()}</p>`
        )
})

app.get('/api/persons/:id',(request , response) => {
const id = Number(request.params.id)
const person = Data.find(person => person.id === id)
if(person)
{
  response.json(person)
}
else
{
  response.status(404).end()
}
})

app.delete('/api/persons/:id',(request,response) =>
{
  const id = Number(request.params.id)
  Data = Data.filter(req => req.id !== id)
  response.status(204).end()
})

app.post('/api/persons',(request,response) => {
  let AllNames = Data.map (req => req.name)
  let flag1 = false
  let flag2 = false

  AllNames = AllNames.map (pro => {
    if(pro == request.body.name)
    {
      flag=true
      console.log(pro)
    }
  })

  if(request.body.name == null || request.body.number == null)
  {
    flag2=true
  }

  if(flag1==false && flag2 == false)
  {
  const newperson = request.body
  newperson.id = (Math.floor(Math.random() * 1000000000001))
  Data = Data.concat(newperson)
  response.json(newperson)
}
else
{
  response.status(400).json({
    error: 'name must be unique or empty details'
  })
}
})

const PORT = 3001
app.listen(PORT , ()=> 
{
    console.log('Server Running')
})