const express = require("express");
const { MongoClient } = require("mongodb");
const debug = require("debug")("app:adminRoutes");

const adminRouter = express.Router();
const books = [
  {
    title: "Crime and Punishment",
    genre: "Historical Fiction",
    author: "Fyodor Dostoyevsky",
    read: false,
  },
  {
    title: "The Three Musketeers",
    genre: "Historical Fiction",
    author: "Alexandre Dumas",
    read: false,
  },
  {
    title: "Brave New World",
    genre: "Science Fiction",
    author: "Aldous Huxley",
    read: false,
  },
  {
    title: "The Expanse",
    genre: "Science Fiction",
    author: "James S. A. Corey",
    read: false,
  },
  {
    title: "The Dark Tower",
    genre: "Fantasy",
    author: "Stephen King",
    read: false,
  },
  {
    title: "A Song of Ice and Fire",
    genre: "Fantasy",
    author: "George R. R. Martin",
    read: false,
  },
  {
    title: "Life On The Mississippi",
    genre: "History",
    author: "Mark Twain",
    read: false,
  },
  {
    title: "The Diary of Anne Frank",
    genre: "Biography",
    author: "Anne Frank",
    read: false,
  },
];

function router(nav) {
  adminRouter.route("/").get((req, res) => {
    const url = "mongodb://localhost:270170";
    const dbName = "libraryApp";

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug("Connected correctly to server");

        const db = client.db(dbName);

        const response = await db.collection("books").insertMany(books);
        res.json(response);
      } catch (err) {
        debug(err.stack);
      }

      client.close();
    })();
  });
  return adminRouter;
}

module.exports = router;
