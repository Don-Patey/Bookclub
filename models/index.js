const Users = require('./Users');
const Books = require('./Books');
const Clubs = require('./Clubs');
const Memberships = require('./Memberships');
const Discussions = require('./Discussions');

Users.belongsToMany(Clubs, {
    through: {
        model: Memberships,
        unique: false,
    },
    as: 'user_memberships'
});

Clubs.belongsToMany(Users, {
    through: {
        model: Memberships,
        unique: false,
    },
    as: 'club_members'
});

Users.hasMany(Discussions, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Discussions.belongsTo(Users, {
    foreignKey: 'user_id',
});

Users.hasMany(Clubs, {
    foreignKey: 'club_admin_id',
    onDelete: 'CASCADE'
});

Clubs.belongsTo(Users, {
    foreignKey: 'club_admin_id',
});

Clubs.hasMany(Discussions, {
    foreignKey: 'club_id',
    onDelete: 'CASCADE',
});

Discussions.belongsTo(Clubs, {
    foreignKey: 'club_id',
});

Books.hasOne(Clubs, {
    foreignKey: 'current_book_id',
});

Clubs.belongsTo(Books, {
    foreignKey: 'current_book_id',
});

Books.hasMany(Discussions, {
    foreignKey: 'book_id',
    onDelete: 'CASCADE'
});

Discussions.belongsTo(Books, {
    foreignKey: 'book_id'
});

module.exports = { Users, Memberships, Discussions, Clubs, Books };