const router = require("express").Router();
const bookRoutes = require("./bookroutes");
const clubRoutes = require("./clubroutes");
const userRoutes = require("./userroutes");
const membershipRoutes = require("./membershiproutes");
const discussionRoutes = require("./discussionroutes");

router.use("/books", bookRoutes);
router.use("/clubs", clubRoutes);
router.use("/user", userRoutes);
router.use("/memberships", membershipRoutes);
router.use("/discussions", discussionRoutes);

module.exports = router;
