import express from 'express';
import {
    getAllAuthors,
    getAuthorById,
    createAuthors,
    updateAuthors,
    deleteAuthor
} from "../model/authorModel.js";
const router = express.Router();

router.get('/authors', (req, res, next) => {
    getAllAuthors()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error",
                    error: e.message
                });
            next(e);
        });
});

router.get('/authors/:id', (req, res, next) => {
    getAuthorById({id: req.params.id})
        .then((result) => {
            if (result.affectedRows !== 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json("Failed to find AuthorID");
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500).json({
                message: "Query Error: AuthorID NOT Found",
                error: e.message
            });
            next()
        });
});

router.post('/authors/create', (req, res) => {
    const data = req.body;

    createAuthors({
            name: data.name,
            surname: data.surname,
            nationality: data.nationality,
            birthYear: data.birthYear,
            deathYear: data.deathYear,
        }
    )
    .then(() => {
        res.status(200)
            .json("Author created successfully");
    })
    .catch((e) => {
        console.error(e.message);
        res.status(500)
            .json({
                message: "Query Error: Failed to create a new Author",
                error: e.message
            });
    });
});

router.post('/authors/update', (req, res) => {
    const data = req.body;
    updateAuthors(
        {
            authorID: data.authorID,
            name: data.name,
            surname: data.surname,
            nationality: data.nationality,
            birthYear: data.birthYear,
            deathYear: data.deathYear
        }
    ).then((result) => {
        if (result.affectedRows !== 0) {
            res.status(200)
                .json("Author Updated");
        } else {
            res.status(404)
                .json("Author NOT Found");
        }
    }).catch((e) => {
        console.error(e.message);
        res.status(500)
            .json({
                message: "Query Error: Failed to update Author",
                error: e.message
            });
    });
});

router.post('/authors/delete', (req, res) => {
    const authorId = req.body.authorID;

    deleteAuthor(authorId)
        .then((result) => {
            if (result.affectedRows !== 0) {
                res.status(200)
                    .json("Author Deleted Successfully");
            } else {
                res.status(404)
                    .json("Author NOT Found");
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to delete Author",
                    error: e.message
                });
        });
});

export default router;
