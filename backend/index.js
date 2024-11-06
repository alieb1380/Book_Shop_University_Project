const express = require('express');
const app = express()
const cors = require('cors');

const mongoose = require('mongoose');

const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true
}))

// routes for book API
const bookRoutes = require('./src/books/book.route');
app.use("/api/books", bookRoutes)

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use('/', (req, res) => {
    res.send("Book Server!");
  })
}

main().then(() => console.log("MongoDB is Conect Successfully!")).catch(err => console.error(err));

app.listen(port, () => {
  console.log(`Example App Listenning on port ${port}`)
})