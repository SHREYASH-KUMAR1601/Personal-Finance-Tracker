const router = require('express').Router();
const auth = require('../middleware/auth');
const { upload } = require('../config');
const ctrl = require('../controllers/receiptController');

router.use(auth);
router.post('/upload', upload.single('file'), ctrl.upload);
router.post('/:id/confirm', ctrl.confirm);
router.get('/', ctrl.list);
router.get('/:id', ctrl.getOne);

module.exports = router;
