const express = require('express');
const router = express.Router();
const Clubs = require('../models/Clubs'); // Import the model (Clubs.js) to use its database functions.

// create a new club
routers.post('/clubs', async (req, res) => {
    try {
        const { name, description, type, club_admin_id, current_book_id} = req.body;
        const newClub = await Clubs.create({ name, description, type, club_admin_id, current_book_id});
        res.json(newClub);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to create new club' });
    }
    }); 

// Get all clubs in a list
router.get('/clubs', async (req, res) => {
    try {
        const allClubs = await Clubs.findAll();
        res.json(allClubs);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve clubs' });
    }   
});

// Get club by ID   
router.get('/clubs/:id', async (req, res) => {
    const clubId = req.params.id;
    try {
        const club = await Clubs.findByPk(clubId);
        if (!club) {
            res.status(404).json({ message: 'Club not found' });
        } else {
            res.json(club);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve club' });
    }
});

// Update club by ID
router.put('/clubs/:id', async (req, res) => {
    const clubId = req.params.id;
    const { name, description, type, club_admin_id, current_book_id} = req.body;
    try {
        const updateClub = await Clubs.update({ name, description, type, club_admin_id, current_book_id}, {
            where: { id: clubId }
        });
        if (updateClub[0] === 0) {
            res.status(404).json({ message: 'Club not found' });
        } else {
            res.json({ message: 'Club updated' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to update club' });
    }
});

// Delete club by ID
router.delete('/clubs/:id', async (req, res) => {
    const clubId = req.params.id;
    try {
        const deleteClub = await Clubs.destroy({
            where: { id: clubId }
        });
        if (!deleteClub) {
            res.status(404).json({ message: 'Club not found' });
        } else {
            res.json({ message: 'Club deleted' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to delete club' });
    }
});

module.exports = router;