import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'

import Data from './data.js'
import key from './apiKey.js'
import Videos from './model.js'


const connect_url = `mongodb+srv://${key.user_db}:${key.password_db}@cluster0.fbdhg.mongodb.net/${key.name_db}?retryWrites=true&w=majority`

mongoose.connect(connect_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const app = express()
const port = 9000

app.use(express.json())
app.use(Cors())
app.use((req,res,next) => {
  res.setHeader('Access-Contorl-Allow-Origin', '*')
  res.setHeader('Access-Contorl-Allow-Headers', '*')
  next()
})

app.get('/',  (req, res) => res.status(200).send('Hello World') )
app.get('/v1/posts', (req,res) => res.status(200).send(Data) )
app.post('/v2/posts', (req,res) => {
  const dbVideo = req.body

  Videos.create(dbVideo, (err, data) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.status(201).send(data)
    }
  })
})
app.get('/v2/posts', (req,res) => {
  Videos.find((err, data) => {
    if(err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(data)
    }
  })
})
 
app.listen(port, () => console.log(`listening on localhot ${port}`))