const express = require('express')
const cors = require('cors')
const { userController } = require('./controllers/user')

const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', userController)
app.listen(5500, () => console.log('Rodando na porta 5500'))
