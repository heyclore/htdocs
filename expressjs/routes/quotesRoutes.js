const Router = require('express');
const quoteQontroller = require('../controllers/quotesQontroller');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');

const router = Router();


router.get('*', checkUser);
router.get('/', quoteQontroller.home);
router.get('/ajax', quoteQontroller.ajax);
router.get('/post/:username', quoteQontroller.post);
router.get('/timeline', quoteQontroller.timeline_get);
router.post('/timeline', requireAuth, quoteQontroller.timeline_post);


router.get('/register', quoteQontroller.register_get);
router.post('/register', quoteQontroller.register_post);
router.get('/login', quoteQontroller.login_get);
router.post('/login', quoteQontroller.login_post);
router.get('/logout', quoteQontroller.logout);

module.exports = router;
