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
app.use('/api/notes', require('./routes/notes'))
app.use('/api/trips', require('./routes/trip'))
app.use('/api/travellers', require('./routes/traveller'))




app.listen(port, () => {
  console.log(`backend listening at http://localhost:${port}`)
})