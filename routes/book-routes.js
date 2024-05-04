const express = require("express");

const {
  getAllBooks,
  addBook,
  updateBook,
  getById,
  deleteBook,
  getByUserId,
} = require("../controllers/book-controller");

const bookRouter = express.Router();

bookRouter.get("/", getAllBooks);
bookRouter.post("/add", addBook);
bookRouter.put("/update/:id", updateBook);
bookRouter.get("/:id", getById);
bookRouter.delete("/:id", deleteBook);
bookRouter.get("/user/:id", getByUserId);

module.exports = bookRouter;
