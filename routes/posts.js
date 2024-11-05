const express = require('express')
const router = express.Router()
const postsController = require('../Controllers/postsController.js')

router.get('/', postsController.index)

router.get('/:slug', postsController.show)

router.get('/tag/:tag', postsController.printByTag)

router.post('/create', postsController.store)

router.post('/update/:slug', postsController.update)

module.exports = router