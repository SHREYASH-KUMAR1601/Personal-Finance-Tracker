const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/summaryController');

router.use(auth);
router.get('/', ctrl.getSummary);

module.exports = router;
