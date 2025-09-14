const router = require('express').Router();
const auth = require('../middleware/auth');
const ctrl = require('../controllers/transactionController');

router.use(auth);
router.post('/', ctrl.create);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);
router.patch('/:id', ctrl.patch);
router.delete('/:id', ctrl.remove);

module.exports = router;
