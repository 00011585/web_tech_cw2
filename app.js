const express = require('express')
const app = express()

app.set('view engine', 'pug')

// app.use('/blogs', blogs)

app.use(express.urlencoded( {extended: false }))

app.use('/static', express.static('./public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(5050, () => console.log('App is running on port 5050...'))