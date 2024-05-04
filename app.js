const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const bookRouter = require("./routes/book-routes");

// const router = require()
const app = express();

mongoose
  .connect(
    "mongodb+srv://alvinabiero:lyabi4321moraa@cluster0.unrg7iw.mongodb.net/Blog?retryWrites=true&w=majority&appName=Bookstore"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

app.use(express.json());

app.use("/api/user", router);
app.use("/api/book", bookRouter);

app.use("/api", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
