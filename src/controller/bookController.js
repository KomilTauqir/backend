// Importing express server, book & changelog Model and creating an express router
import express from 'express';

import {
    getAllBooks,
    getDistinctCoverImagePath,
    getDistinctAuthor,
    getAllBooksAndAuthors,
    getAllTables,
    getBookById,
    createBooks,
    updateBooks,
    deleteBook
} from "../model/bookModel.js";

import {
    createChangeLog,
    updateChangeLog
} from "../model/changeLogModel.js";


const router = express.Router();

router.get('/books', (req, res) => {
    getAllBooks()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});

router.get('/distinctImage', (req, res) => {
    getDistinctCoverImagePath()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});

router.get('/distinctAuthor', (req, res) => {
    getDistinctAuthor()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});

router.get('/booksAndAuthors', (req, res) => {
    getAllBooksAndAuthors()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});

router.get('/allTables', (req, res) => {
    getAllTables()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message:"Query Error",
                    error: e.message
                });
        });
});

router.get('/books/:id', (req, res) => {
    getBookById(req.params.id)
        .then((result) => {
            if (result.length > 0) {
                res.status(200)
                    .json(result[0]);
            } else {
                res.status(404)
                    .json({message: "Failed to find BookID"});
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: BookID NOT Found",
                    error: e.message
                });
        });
});

router.post('/books/create', (req, res) => {
    const data = req.body;

    createBooks(
        {
            bookTitle: data.bookTitle,
            originalTitle: data.originalTitle,
            yearofPublication: data.yearofPublication,
            genre: data.genre,
            millionsSold: data.millionsSold,
            languageWritten: data.languageWritten,
            coverImagePath: data.coverImagePath,
            authorID: data.authorID
        }
    )
        .then((result) => {
            res.status(200).json("Book created successfully");
            createChangeLog(
                {
                    bookID: result.insertId,
                    userID: req.session.user.userId
                }
            ).then(() => console.log('Book created successfully')
            );

            // console.log(result);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message:"Query Error: Failed to create a new Book",
                    error: e.message
                });
        });
});

router.post('/books/update', (req, res) => {
    const data = req.body;

    updateChangeLog(
        {
            userId: req.session.user.userId,
            bookID: data.bookID
        }
    ).then(() => console.log('Update function executed.'))
    updateBooks(
        {
            bookID: data.bookID,
            bookTitle: data.bookTitle,
            originalTitle: data.originalTitle,
            yearofPublication: data.yearofPublication,
            genre: data.genre,
            millionsSold: data.millionsSold,
            languageWritten: data.languageWritten,
            coverImagePath: data.coverImagePath,
            authorID: data.authorID
        }
    )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("Book Updated");
            } else {
                res.status(404).json("Book NOT Found");
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to update Book",
                    error: e.message
                });
        });
});

router.post('/books/delete', (req, res) => {
    const bookId = req.body.bookID;

    deleteBook({bookId})
        .then((result) => {
            if (result.affectedRows !== 0) {
                res.status(200).json("Book Deleted Successfully");
            } else {
                res.status(404).json("Book NOT Found");
            }
        })
        .catch((e) => {
            console.log(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to delete Book",
                    error: e.message
                });
        });
});

export default router;
