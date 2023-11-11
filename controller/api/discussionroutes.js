const express = require('express');
const router = express.Router();
const { Discussions } = require('../../models');

// Create a new discussion
router.post('/', async (req, res) => {
  try {
    const discussion = await Discussions.create( {
      ...req.body,
      user_id: req.session.user_id, 
    });
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
