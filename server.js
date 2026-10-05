const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// List of books
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho"
    },
    {
        id: 2,
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam"
    }
];

// GET - Get all books
app.get("/books", (req, res) => {
    res.json(books);
});

// POST - Add a new book
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    const newBook = {
        id: books.length + 1,
        title: title,
        author: author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// PUT - Update a book
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;

    res.json(book);
});

// DELETE - Delete a book
app.delete("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});