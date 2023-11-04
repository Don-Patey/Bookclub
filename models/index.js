const Users = require('./Users');
const Books = require('./Books');
const Clubs = require('./Clubs');
const Memberships = require('./Memberships');
const Discussions = require('./Discussions');
const JoinRequests = require('./JoinRequests');

Users.hasMany(Memberships, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Memberships.belongsTo(Users, {
    foreignKey: 'user_id'
});

Clubs.hasMany(Memberships, {
    foreignKey: 'club_id',
    onDelete: 'CASCADE',
});

Memberships.belongsTo(Clubs, {
    foreignKey: 'club_id'
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

Users.hasMany(JoinRequests, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

JoinRequests.belongsTo(Users, {
    foreignKey: 'user_id',
});

Clubs.hasMany(JoinRequests, {
    foreignKey: 'club_id',
    onDelete: 'CASCADE'
});

JoinRequests.belongsTo(Clubs, {
    foreignKey: 'club_id'
});

module.exports = { Users, Memberships, Discussions, Clubs, Books, JoinRequests };