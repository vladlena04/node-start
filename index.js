const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {addNote, editNote, getNotes, removeNote} = require('./notes.controller')

const port = 3000
const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')
app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.urlencoded({
  extended: true
}))

app.get('/', async (req, res) => {
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.post('/', async (req, res) => {
  await addNote(req.body.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
})

app.delete('/:id', async (req, res) => {
  await removeNote(req.params.id)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: false
  })
})

app.put('/:id/:title', async (req, res) => {
  console.log('put', req.params.id, req.params.title)
  await editNote(req.params.id, req.params.title)
  res.render('index', {
    title: 'Express App',
    notes: await getNotes(),
    created: true
  })
})

app.listen(port, () => {
  console.log(chalk.green(`Server has been started on port ${port}...`))
})
