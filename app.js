const express = require('express')
const app = express()
const HOST = process.env.HOST
const PORT = process.env.PORT

const logger = require('./middleware/logger.js')
const notFound = require('./middleware/notFound.js')

app.use(express.json())

//Create a Server Error to test Server Error Handling
// app.use((req, res, next) => {
//   throw new Error('Try Server Error Handling')
// })

app.use('/public',express.static('public'))


const postsRouter = require('./routes/posts.js')


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