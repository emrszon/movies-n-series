const {ContentController} = require('../controllers/ContentController')

const router = require('express').Router()

router.get(['/random'], ContentController.GetRandomContent)
router.get(['/', '/:type'], ContentController.GetContent)

module.exports = router