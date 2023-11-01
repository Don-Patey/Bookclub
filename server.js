const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
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
    name: "Fiction Club",
    description: "A cool club to discuss fiction books.",
    type: "Fiction",
    club_admin: "Nicole Herritt", // to be changed to int
    current_book_id: "Perfume", // to be changed to int
  },
  {
    name: "Non-Fiction Club",
    description: "A cool club to discuss non-fiction books.",
    type: "Non-Fiction",
    club_admin: "Jack Black", // to be changed to int
    current_book_id: "Chicken soup for the soul", // to be changed to int
  },
  {
    name: "History Club",
    description: "A cool club to discuss history books.",
    type: "Non-Fiction",
    club_admin: "Robin Hood", // to be changed to int
    current_book_id: "The History of Sherwood Forest", // to be changed to int
  },

  // ... other clubs
];

app.get("/", (req, res) => {
  res.render("index", { club: clubs });
});

//app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
