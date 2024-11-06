const express = require('express');

const prodRouter = require('./routes/products.js')

const app = express();

app.use(express.json())

//vaiable = var from env OR a default value
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';


app.listen(PORT,() => {
  console.log(`Server is running on ${HOST}:${PORT}`)
});


app.use('/products',prodRouter)