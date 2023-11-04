const sequelize = require('../config/connection');
const { Users, Clubs, Books, Memberships, Discussions} = require('../models');

const userData = require('./userData.json');
const clubData = require('./clubData.json');
const bookData = require('./bookData.json');
const memberData = require('./membershipData.json');
const discussionData = require('./discussionData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Users.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
    const books = await Books.bulkCreate(bookData, {
    individualHooks: true,
    returning: true,
  });
  const clubs = await Clubs.bulkCreate(clubData, {
    individualHooks: true,
    returning: true,
  });

  const membership = await Memberships.bulkCreate(memberData, {
    individualHooks: true,
    returning: true,
  });

  const discussion = await Discussions.bulkCreate(discussionData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();