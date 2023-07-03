const rascal = require('rascal')
const config = require('../app/config.json')

const broker = rascal.BrokerAsPromised.create(config)

async function publishToExchange(usersPublication, message) {
  try {
    const publication = await (await broker).publish(usersPublication, message)
    console.log(`Message published with id ${publication}`)
  } catch (error) {
    console.error(error)
  }
}

module.exports = publishToExchange
