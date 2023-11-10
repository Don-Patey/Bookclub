const router = require('express').Router();
const bookRoutes = require('./bookroutes');
const clubRoutes = require('./clubroutes');
const userRoutes = require('./userroutes');
<<<<<<< Updated upstream
const membershipRoutes = require('./membershiproutes');
const discussionRoutes = require('./discussionroutes');
=======
>>>>>>> Stashed changes


router.use('/books', bookRoutes);
router.use('/clubs', clubRoutes);
router.use('/user', userRoutes);
<<<<<<< Updated upstream
router.use('/memberships', membershipRoutes);
router.use('/discussions', discussionRoutes);
=======
>>>>>>> Stashed changes


module.exports = router;