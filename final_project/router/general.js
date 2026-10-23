
const express = require('express');
const books = require('./booksdb.js');
const isValid = require('./auth_users.js').isValid;
const users = require('./auth_users.js').users;

const public_users = express.Router();

// Task 7: Register a new user
public_users.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: 'Username and password are required'
            });
        }

        if (isValid(username)) {
            return res.status(409).json({
                message: 'Username already exists'
            });
        }

        users.push({ username, password });

        return res.status(201).json({
            message: 'User successfully registered'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
});

// Task 2: Get all books
public_users.get('/', async (req, res) => {
    try {
        return res.status(200).json(books);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve books'
        });
    }
});

// Task 3: Get a book by ISBN
public_users.get('/isbn/:isbn', async (req, res) => {
    try {
        const book = books[req.params.isbn];

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve book'
        });
    }
});

// Task 4: Get books by author
public_users.get('/author/:author', async (req, res) => {
    try {
        const author = req.params.author.toLowerCase();

        const result = Object.values(books).filter(book =>
            String(book.author).toLowerCase() === author
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve books by author'
        });
    }
});

// Task 5: Get books by title
public_users.get('/title/:title', async (req, res) => {
    try {
        const title = req.params.title.toLowerCase();

        const result = Object.values(books).filter(book =>
            String(book.title).toLowerCase() === title
        );

        return res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve books by title'
        });
    }
});

// Task 6: Get reviews for a book
public_users.get('/review/:isbn', async (req, res) => {
    try {
        const book = books[req.params.isbn];

        if (!book) {
            return res.status(404).json({
                message: 'Book not found'
            });
        }

        return res.status(200).json(book.reviews || {});
    } catch (error) {
        return res.status(500).json({
            message: 'Unable to retrieve reviews'
        });
    }
});

module.exports.general = public_users;
