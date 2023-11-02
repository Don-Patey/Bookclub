const express = require('express');
const router = express.Router();
const Users = require('../../models/Users');
const bcrypt = require('bcrypt');

// create a new user    
router.post('/register', async (req, res) => {
    try {
        const userData = await Users.create(req, body);
        res.status(200).json(userData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// login a user
router.post('/login', async (req, res) => {
    try {
        const userData = await Users.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        const validPassword = await bcrypt.compare(req.body.password, userData.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        res.status(200).json({ message: 'You are now logged in!' });
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
      const users = await Users.findAll();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Get a specific user by ID
  router.get('/users/:id', async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Update a user by ID
  router.put('/users/:id', async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await user.update(req.body);
        res.status(200).json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // Delete a user by ID
  router.delete('/users/:id', async (req, res) => {
    try {
      const user = await Users.findByPk(req.params.id);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      } else {
        await user.destroy();
        res.status(204).end();
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  module.exports = router;