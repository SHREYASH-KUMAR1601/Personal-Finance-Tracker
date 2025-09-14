const router = require('express').Router();
const auth = require('../middleware/auth');
const { upload } = require('../config');
const ctrl = require('../controllers/importController');

router.use(auth);
router.post('/', upload.single('file'), ctrl.enqueue);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

module.exports = router;
