const { log } = require('console')
const posts = require('../db/posts.js')
const fs = require('fs')

// const index = (req,res) => {
//   let markup = '<ul>'

//   posts.forEach(post => {

//     const {title, content, image} = post

//     markup += `
//     <li>
//       <h2>${title}</h2>
//       <p>${content}</p>
//       <img src="public/imgs/posts/${image}" alt="">
//     </li>
//       `
//   });
//   markup += `</ul>`
//   res.send(markup)
// }

const index = (req,res) => {
  res.json({
    data: posts,
    counter: posts.length
  })
}

const show = (req, res) => {
  const post = posts.find(post => post.slug === req.params.slug)
  // console.log(post);
  
  res.json({
    data:post
  })
}

const printByTag = (req, res) => {
  const tag = req.params.tag

  const postsWTag = posts.filter( element => element.tags.includes(tag))
  console.log(postsWTag);
  res.send(postsWTag)
}

const store =(req,res) => {
  const toStore = {
    ...req.body
  }

  posts.push(toStore)
  fs.writeFileSync('./db/posts.js',`module.exports=${JSON.stringify(posts,null,2)}`)

  console.log(posts);
  res.json({posts})
  
}

const update = (req,res) => {
  const update = {
    ...req.body
  }

  const toUpdate = posts.find(post => {
    if(post.slug.toLowerCase() === req.params.slug.toLowerCase()){
      posts.splice(posts.indexOf(post),1, {update})
      return true
    } else {
      return false
    }
  })
  console.log(posts)
  

  res.json({
    update: posts
  })
  
}

module.exports ={
  index, 
  show,
  printByTag,
  store,
  update
}