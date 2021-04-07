const express = require('express')
const app = express()
const fs = require('fs')

app.set('view engine', 'pug')

// app.use('/blogs', blogs)

app.use(express.urlencoded( {extended: false }))

app.use('/static', express.static('./public'))

app.get('/', (req, res) => {
  res.render('index')
})


app.get('/blog/create', (req, res) => {
  res.render('create')
})

app.post('/blog/create', (req, res) => {
  const blog = {
    topic: req.body.topic,
    title: req.body.title,
    body: req.body.body,
    isNew: true,
    id: '_' + Math.random().toString(36).substr(2,9)
  }


  if (blog.title.trim() === '' || blog.topic.trim() === '' || blog.body.trim() == ''){
    res.render('/')
  } else {
    fs.readFile('./data/blogs.json', (err, data) => {
      if (err) throw err
      const blogs = JSON.parse(data)
      blogs.push(blog)
      fs.writeFile('./data/blogs.json', JSON.stringify(blogs), (err) => {
        if (err) throw err

        res.render('index')
      })
    })
  }
})

app.get('api/v1/blogs', (req, res) => {
  fs.readFile('./data/blogs.json', (err, data) => {
    if (err) throw err
    const blogs = JSON.parse(data)
    res.json(blogs)
  })
})


app.listen(5050, () => console.log('App is running on port 5050...'))