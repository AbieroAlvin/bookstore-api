const Book = require("../models/Book");
const User = require("../models/User");

const getAllBooks = async (req, res) => {
  let books;
  try {
    books = await Book.find();
  } catch (err) {
    return console.log(err);
  }
  if (!books) {
    return res.status(404).json({ message: "No Books Found" });
  }
  return res.status(200).json({ books });
};

const addBook = async (req, res) => {
  const { title, description, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }

  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find User By this ID" });
  }

  const book = new Book({
    title,
    description,
    user,
  });

  try {
    const session = await mongoose.startSession();
    await book.save({ session });
    existingUser.books.push(book);
    await existingUser.save({ sessionn });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }

  return res.status(200).json({ book });
};

const updateBook = async () => {
  const { title, description } = req.body;
  const bookId = req.params.bookId;
  let book;
  try {
    book = await Book.findByIdAndUpdate(bookId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }

  if (!book) {
    return res.status(500).json({ message: "Unable To Update The Book" });
  }
  return res.status(200).json({ blog });
};

const getById = async (req, res) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findById(id);
  } catch (err) {
    return res.status(404).json({ message: "No Book Found" });
  }
  return res.status(200).json({ blog });
};

const deleteBook = async (req, res) => {
  const id = req.params.id;
  let book;
  try {
    book = await Book.findByIdAndDelete(id).populate("user");
    await book.user.books.pull(blog);
    await book.user.save();
  } catch (err) {
    console.log(err);
  }

  if (!book) {
    return res.status(400).json({ message: "Unable To Delete" });
  }

  return res.status(200).json({ message: "Successfully Deleted" });
};

const getByUserId = async (req, res) => {
  const userId = req.params.id;
  let userBooks;
  try {
    userBooks = await User.findById(userId).populate("books");
  } catch (err) {
    return console.log(err);
  }
  if (!userBooks) {
    return res.status(404).json({ message: "No Book Found" });
  }

  return res.status(200).json({ blogs: userBooks });
};

module.exports = {
  getAllBooks,
  addBook,
  updateBook,
  getById,
  deleteBook,
  getByUserId,
};
