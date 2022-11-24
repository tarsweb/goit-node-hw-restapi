import app from './app.js'
// const app = require('./app')

import * as dotenv from 'dotenv'
dotenv.config()
// require('dotenv').config()

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server running. Use our API on port:", PORT)
})