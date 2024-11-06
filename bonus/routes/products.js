const express = require('express')
const router = express.Router()

const productsController = require('../controllers/prodControllers.js')

//Show all products
router.get('/',productsController.index)

//Get one product
router.get('/:id', productsController.show)

//update a product
router.put('/update/:id', productsController.update)

//Creare a new product
router.post('/create', productsController.create)

//Delete a product
router.delete('/delete/:id', productsController.destroy);


module.exports = router