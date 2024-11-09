const express = require('express')
const app = express()
const HOST = process.env.HOST || "http://127.0.0.1"
const PORT = process.env.PORT || 3000 || 3001

// 📌 middlewares
const logger = require('./middleware/logger.js')
const notFound = require('./middleware/notFound.js')

// 📌 routes
const postsRouter = require('./routes/posts.js')

app.use(express.json())



//Create a Server Error to test Server Error Handling
// app.use((req, res, next) => {
//   throw new Error('Try Server Error Handling')
// })
  
app.use('/public',express.static('public'))

app.listen(PORT, () => {
  console.log(`Server listening on ${HOST}:${PORT}`);
})

app.use('/posts',logger)
app.use('/posts',postsRouter)

app.use(notFound)

//Server Errors Handler (5xx) -- DO NOT WRITE AFTER THIS FUNCTION
app.use((err,req,res,next) => {
  console.error(err.message);
  res.status(500).send('Something went wrong! 500 Internal Server Error');
})