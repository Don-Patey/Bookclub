const router = require('express').Router();
const bookRoutes = require('./bookroutes');
const clubRoutes = require('./clubroutes');
const userRoutes = require('./userroutes');


router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);
router.use('/user', userRoutes);


module.exports = router;