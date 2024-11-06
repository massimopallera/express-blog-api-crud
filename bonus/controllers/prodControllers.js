const products = require('../db/products.js');
const fs = require('fs');

function findEl(value){
  if(isNaN(value)){
    return products.find(prod => prod.name.toLowerCase() === value.toLowerCase());
  }
  return products.find(prod => prod['id'] === Number(value));
}

//Show all products
const index = (req, res) => {
  res.status(200).json(products);
}

//Get one product
const show = (req, res) => {

  const reqId = req.params.id;
  
  const product = findEl(reqId)
  
  if(!product){
    res.status(404).send(`404 Not Found ${product}`)
  }
  
  res.status(200).json(product)
}

//Update a product
const update = (req,res) => {
  const toUpdate = {...req.body}
  
  const reqId = req.params.id;
  const product = findEl(reqId)

  if(!product){
    res.status(404).send(`404 Not Found ${product}`)
  }

  products.splice(products.indexOf(product),1,toUpdate)

  fs.writeFileSync('./db/products.js', `module.exports=${JSON.stringify(products, null, 2)}`);

  res.status(200).json({
    "status" : 200,
    "data": products
  })
}


//Creare a new product
const create = (req, res) => {}

//Delete a product
const destroy = (req, res) => {}

module.exports = {
  index,
  show,
  update,
  create,
  destroy
}