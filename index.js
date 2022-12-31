const connectToMongo = require('./db');
const express = require('express')
const cors=require('cors')

connectToMongo();
const app = express()
const port = 5000

app.use(express.json())
app.use(cors())
app.use('/assets',express.static('assets'));
// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/client', require('./routes/client'))
app.use('/api/plates', require('./routes/plates'))
app.use('/api/panaflex', require('./routes/panaflex'))
app.use('/api/film', require('./routes/film'))
app.use('/api/colorPrint', require('./routes/colorPrint'))
app.use('/api/weddingCard', require('./routes/weddingCard'))

app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})