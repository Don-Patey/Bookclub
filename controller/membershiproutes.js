const express = require('express');
const router = express.Router();   
const { Memberships } = require('../../models/Memberships');

// Create a new membership
router.post('/', async (req, res) => {
    try {
        const membershipData = await Memberships.create(req.body);
        res.status(200).json(membershipData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all memberships
router.get('/', async (req, res) => {
    try {
        const membershipData = await Memberships.findAll();
        res.status(200).json(membershipData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single membership by id
router.get('/:id', async (req, res) => {
    try {
        const membershipData = await Memberships.findByPk(req.params.id);
        if (!membershipData) {
            res.status(404).json({ message: 'No membership found with this id!' });
        } else {
            res.status(200).json(membershipData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a membership by id
router.put('/:id', async (req, res) => {
    try {
        const membershipData = await Memberships.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!membershipData[0]) {
            res.status(404).json({ message: 'No membership found with this id!' });
        } else {
            res.status(200).json(membershipData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a membership by id
router.delete('/:id', async (req, res) => {
    try {
        const membershipData = await Memberships.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (!membershipData) {
            res.status(404).json({ message: 'No membership found with this id!' });
        } else {
            res.status(200).json(membershipData);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;