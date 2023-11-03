const router = require('express').Router();
const bookRoutes = require('./bookroutes');
const clubRoutes = require('./clubroutes');


router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);


module.exports = router;