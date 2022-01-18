const express = require("express")

const carRouter = require('./cars/cars-router')

const server = express()

server.use(express.json())

server.use('/api/cars', carRouter)

server.get('/', (req, res) => {
    res.send(`
      <h2>Cars API</h2>
      <p>Welcome to the Car API</p>
    `);
  });

server.use('*', (req, res) => {
    res.status(404).json({ message: `${req.method} ${req.baseUrl} not found!` })
})

module.exports = server
