const express = require('express');
const router = express.Router();
const Discussions = require('../models/Discussions');

// Create a new discussion
router.post('/', async (req, res) => {
  try {
    const discussion = await Discussions.create(req.body);
    res.status(201).json(discussion);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all discussions
router.get('/', async (req, res) => {
  try {
    const discussions = await Discussions.findAll();
    res.status(200).json(discussions);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific discussion by ID
router.get('/:id', async (req, res) => {
  try {
    const discussion = await Discussions.findByPk(req.params.id);
    if (!discussion) {
      res.status(404).json({ message: 'Discussion not found' });
    } else {
      res.status(200).json(discussion);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a discussion by ID
router.put('/:id', async (req, res) => {
  try {
    const discussion = await Discussions.findByPk(req.params.id);
    if (!discussion) {
      res.status(404).json({ message: 'Discussion not found' });
    } else {
      await discussion.update(req.body);
      res.status(200).json(discussion);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a discussion by ID
router.delete('/:id', async (req, res) => {
  try {
    const discussion = await Discussions.findByPk(req.params.id);
    if (!discussion) {
      res.status(404).json({ message: 'Discussion not found' });
    } else {
      await discussion.destroy();
      res.status(204).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
