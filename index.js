const cors = require('cors')
const express = require('express')
const routes = require('./routes/index')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//app.use('/slider', routes.slider) => exemple route

app.listen(4242, () => console.log('Express server is running'))