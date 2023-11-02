const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const helpers = require("handlebars-helpers")();
const Books = require("./models/Books");
//const routes = require('./controllers');

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", exphbs.engine({ helpers }));
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//example clubs - to be pull from database
const clubs = [
  {
    id: 1,
    name: "Fiction Club",
    description: "A cool club to discuss fiction books.",
    type: "Fiction",
    club_admin: 1,
    current_book_id: 1,
  },
  {
    id: 2,
    name: "Non-Fiction Club",
    description: "A cool club to discuss non-fiction books.",
    type: "Non-Fiction",
    club_admin: 2,
    current_book_id: 2,
  },
  {
    id: 3,
    name: "History Club",
    description: "A cool club to discuss history books.",
    type: "Non-Fiction",
    club_admin: 3,
    current_book_id: 3,
  },

  // ... other clubs
];

const bookList = [
  {
    id: 1,
    name: "Perfume",
    description:
      "A 1985 literary historical fantasy novel by German writer Patrick Süskind. The novel explores the sense of smell and its relationship with the emotional meanings that scents may have.",
  },
  {
    id: 2,
    name: "World War II: A New History",
    description:
      "This book is a magisterial global history of World War II. Beginning in 1937 with the outbreak of the Sino-Japanese War, Evan Mawdsley shows how the origins of World War II lay in a conflict between the old international order and the new and then traces the globalisation of the conflict as it swept through Asia, Europe, and the Middle East.",
  },
  {
    id: 3,
    name: "Behind the Beautiful Forevers: Life, Death, and Hope in a Mumbai Undercity",
    description:
      "In this breathtaking book by Pulitzer Prize winner Katherine Boo, a bewildering age of global change and inequality is made human through the dramatic story of families striving toward a better life in Annawadi, a makeshift settlement in the shadow of luxury hotels near the Mumbai airport.",
  },
];

const discussions = [
  {
    id: 1,
    text: "I loved the latest book!",
    created_on: "Nov 2, 2023",
    user_id: 1,
    club_id: 1,
    book_id: 1,
  },
  {
    id: 2,
    text: "It was ok - I liked some parts of it",
    created_on: "Nov 2, 2023",
    user_id: 2,
    club_id: 1,
    book_id: 1,
  },
  {
    id: 3,
    text: "Great book",
    created_on: "Nov 1, 2023",
    user_id: 3,
    club_id: 2,
    book_id: 2,
  },
];

const memberships = [
  {
    id: 1,
    user_id: 1,
    club_id: 1,
  },
  {
    id: 2,
    user_id: 1,
    club_id: 2,
  },
];

const users = [
  { id: 1, name: "Joe Smith" },
  { id: 2, name: "Bob Clark" },
  { id: 3, name: "Susan Young" },
];

// TODO: determien current user id via login
const currentUserId = 1;

app.get("/", (req, res) => {
  res.render("index", { club: clubs });
});

app.get("/bookPage/:id", async (req, res) => {
  //TODO: ensure Id is within bounds of bpok list
  const book = bookList[req.params.id - 1];

  res.render("bookpage", { book });
});

app.get("/clubPage/:id", async (req, res) => {
  const clubId = req.params.clubId;
  // TODO: Query the database to get club, users, discussions, and memberships
  // for now, we mimic the data

  //TODO: ensure Id is within bounds of clubs
  const club = clubs[req.params.id - 1];

  //TODO: get the discussion list by querying the database
  // discussions =

  //TODO: get the memberships by querying the database
  // memberships =

  //TODO: get the users by querying the database

  // Determine the user role

  const userRole = {
    isAdmin: club.club_admin == currentUserId,
    isMember: isUserAMember(currentUserId, club.id),
  };

  // TODO: query the database to get the user table
  // users =

  // Render the club page with the necessary data
  res.render("clubPage", {
    bookList,
    club,
    users,
    discussions,
    memberships,
    userRole,
  });
});

function isUserAMember(userID, clubID) {
  for (var i = 0; i < memberships.length; i++) {
    var membershipUser = memberships[i].user_id;
    var membershipClub = memberships[i].club_id;

    if (membershipClub === clubID) {
      if (membershipUser === userID) {
        return true;
      }
    }
  }

  return false;
}

app.get("/bookListPage", (req, res) => {
  //TODO: replace by pulling book list from database

  res.render("bookListPage", { book: bookList });
});

//app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
