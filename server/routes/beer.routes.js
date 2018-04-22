const Router = require('koa-router');
const router = new Router();
const beerController = require('../controllers/beerController');
const BASE_URL = '/api/beer';
const BASE_URL1 = '/api/beer/:id';

router.get(BASE_URL,beerController.index)
router.get(BASE_URL1,beerController.get)

module.exports = router