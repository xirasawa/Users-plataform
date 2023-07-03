const router = require('express').Router()
const publishToExchange = require('../adapters/broker')
const users = require('../models/users')

router.route('/').get(async (req, res) => {
  const user = await users.findMany()
  res.json(user)
})

router.route('/:id').get(async (req, res) => {
  const userId = parseInt(req.params.id)

  const user = await users.findUnique({
    where: {
      id: userId
    }
  })

  if (!user) {
    return res.json('User not found!')
  }

  res.json(user)
})

router.route('/').post(async (req, res) => {
  const { name, city, avatar } = req.body

  const message = {
    data: { name, city, avatar }
  }

  await publishToExchange('createPublication', message)

  res.json('User creation request received')
})

router.route('/:id').put(async (req, res) => {
  const userId = parseInt(req.params.id)
  const { name, city, avatar } = req.body

  const message = {
    data: { id: userId, name, city, avatar }
  }

  await publishToExchange('updatePublication', message)

  res.json('User update request received')
})

router.route('/:id').delete(async (req, res) => {
  const userId = parseInt(req.params.id)

  const message = {
    data: { id: userId }
  }

  await publishToExchange('deletePublication', message)

  res.json('User deletion request received')
})

module.exports = { userController: router }
