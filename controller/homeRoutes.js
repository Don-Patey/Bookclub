const router = require('express').Router();
const { Clubs, Discussions, Books, Users, Memberships } = require('../models');


// Get all clubs in a list
router.get('/', async (req, res) => {
    try {
        const allClubs = await Clubs.findAll({
            include: [
                {
                    model: Books,
                },
                {
                    model: Users,
                    attributes: {exclude: ['password']},
                },
            ],
        });

        const clubs = allClubs.map((club) => club.get({plain: true}));

        res.render('index', {
            clubs,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }   
});

// Get club by ID   
router.get('/getClub/:id', async (req, res) => {
    const clubId = req.params.id;
    
    try {
        const selectedClub = await Clubs.findByPk(clubId, {
            include: [{
                    model: Books,
                },
                {
                    model: Users,
                    attributes: {exclude: ['password']},
                },
                {
                    model: Users,
                    through: Memberships, as: 'club_members'

                },
            ],
        });
        
        const club = selectedClub.get({plain:true});
       

        if (!club) {
            res.status(404).json({ message: 'Club not found' });
        } else {
            const userRole = {
            isAdmin: club.club_admin_id == '1',
            isMember: isUserMember('1', club.club_members),
            }
            
            res.render('clubPage', {
               club,
               userRole, 
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Failed to retrieve club' });
    }
});

const isUserMember = (userId, membership) => {
    for (var i = 0; i < membership.length; i++) {
        if (membership[i].id == userId) {
            return true;
        }
    }
    return false; 
};

module.exports = router;