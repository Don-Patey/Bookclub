const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const Books = require("./models/Books");
//const routes = require('./controllers');

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({
  helpers: {
    ifEquals: function (arg1, arg2, options) {
      return arg1 == arg2 ? options.fn(this) : options.inverse(this);
    },
    // ... other helpers you might have
  },
  // ... other configuration options
});

app.engine("handlebars", hbs.engine);
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
    club_admin: "Nicole Herritt", // to be changed to int
    current_book_id: "Perfume", // to be changed to int
  },
  {
    id: 2,
    name: "Non-Fiction Club",
    description: "A cool club to discuss non-fiction books.",
    type: "Non-Fiction",
    club_admin: "Jack Black", // to be changed to int
    current_book_id: "Chicken soup for the soul", // to be changed to int
  },
  {
    id: 3,
    name: "History Club",
    description: "A cool club to discuss history books.",
    type: "Non-Fiction",
    club_admin: "Robin Hood", // to be changed to int
    current_book_id: "The History of Sherwood Forest", // to be changed to int
  },

  // ... other clubs
];

const bookList = [
  {
    id: 1,
    name: "Example Book",
    description: "This is an example book.",
  },
  {
    id: 2,
    name: "Another Book",
    description: "This is an another book.",
  },
];

const users = [{}, {}, {}];
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

  //mimick the discussion list retrieved by querying the database
  const discussions = [
    {
      id: 1,
      text: "I loved the latest book!",
      created_on: new Date(),
      user_id: 1,
      club_id: 1,
      book_id: 1,
    },
  ];
  // Mimicking a membership object
  const memberships = [
    {
      id: 1,
      user_id: 1,
      club_id: 1,
    },
  ];

  // Mimicking a userRole object
  const userRole = {
    isAdmin: false,
    isMember: false,
    isNonMember: true,
  };

  // Render the club page with the necessary data
  res.render("clubPage", { club, discussions, memberships, userRole });
});

app.get("/bookListPage", (req, res) => {
  //TODO: replace by pulling book list from database

  res.render("bookListPage", { book: bookList });
});

//app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
