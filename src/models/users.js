const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const users = prisma.users

module.exports = users
