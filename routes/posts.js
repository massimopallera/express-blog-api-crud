const express = require('express')
const router = express.Router()
const postsController = require('../Controllers/postsController.js')

router.get('/', postsController.index)

router.get('/:slug', postsController.show)

router.get('/tag/:tag', postsController.printByTag)

router.post('/create', postsController.store)

router.put('/update/:slug', postsController.update)

router.delete('/delete/:slug', postsController.destroy)

module.exports = router