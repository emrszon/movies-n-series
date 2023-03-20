const {ContentController} = require('../controllers/ContentController')
const authenticateUser = require('../middlewares/verifyToken')

const router = require('express').Router()

router.get(['/random'],authenticateUser, ContentController.GetRandomContent)
router.get(['/', '/:type'],authenticateUser, ContentController.GetContent)
router.post(['/rate-content'],authenticateUser, ContentController.rateContent)
router.patch(['/view-content'],authenticateUser, ContentController.viewContent)
router.patch(['/movie-of-the-day'],authenticateUser, ContentController.setMovieOfTheDay)
router.ws('/ws', ContentController.getMovieOfTheDay);

module.exports = router