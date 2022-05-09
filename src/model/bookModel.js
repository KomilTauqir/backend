import {query} from '../database.js';
// CRUD - READ ALL Books
export const getAllBooks = async () => await
    // Making a query to the database
    query(
        `
        SELECT bookID, bookTitle, originalTitle, yearofPublication, 
        genre, millionsSold, languageWritten, coverImagePath, authorID
        FROM book;
        `
    );

// CRUD - READ Distinct Images
export const getDistinctCoverImagePath = async () => await
    query(
        `
        SELECT DISTINCT b.coverImagePath
        FROM book b
        INNER JOIN author a
        ON b.authorID = a.authorID;
        `
    );


// CRUD - READ Distinct Authors
export const getDistinctAuthor = async () => await
    query(
        `
        SELECT DISTINCT a.authorID, a.name, a.surname
        FROM book b
        INNER JOIN author a
        ON b.authorID = a.authorID;
        `
    );


// CRUD - READ ALL Books and Authors
export const getAllBooksAndAuthors = async () => await
    query(
        `
        SELECT b.bookID, b.bookTitle, b.originalTitle, b.yearofPublication, 
        b.genre, b.millionsSold, b.languageWritten, b.coverImagePath, b.authorID,
        name, surname, nationality, birthYear, deathYear
        FROM book b
        INNER JOIN author a
        ON b.authorID = a.authorID;
        `
    );


// CRUD - READ ALL Tables
export const getAllTables = async () => await
    query(
        `
        SELECT b.bookID, b.bookTitle, b.originalTitle, b.yearofPublication, b.genre, b.millionsSold, b.languageWritten,
        b.coverImagePath, a.authorID, a.name, a.surname, a.nationality, a.birthYear, a.deathYear, cl.changeLogID, 
        CONCAT(DATE(dateCreated), ' ', TIME(dateCreated)) AS dateCreated, CONCAT(DATE(dateChanged), ' ', 
        TIME(dateChanged)) AS dateChanged, u.userID, u.firstName, u.lastName, u.email, u.username, u.accessRights
        FROM changelog cl
        RIGHT JOIN users u
        ON cl.userID = u.userID
        RIGHT JOIN book b
        ON cl.bookID = b.bookID
        RIGHT JOIN author a
        ON b.authorID = a.authorID;
        `
    );


// CRUD - READ Book by ID
export const getBookById = async ({id}) => await
    query(
        `
        SELECT bookID, bookTitle, originalTitle, yearofPublication, 
        genre, millionsSold, languageWritten, coverImagePath, authorID
        FROM book
        WHERE bookID = ?;
        `, [id]
    );


// CRUD - CREATE books
export const createBooks = async ({
                                      bookTitle, originalTitle, yearofPublication,
                                      genre, millionsSold, languageWritten, coverImagePath, authorID
                                  }) => await
    query(
        `
        INSERT INTO book (bookTitle, originalTitle, yearofPublication, 
        genre, millionsSold, languageWritten, coverImagePath, authorID)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?);
        `, [bookTitle, originalTitle, yearofPublication,
            genre, millionsSold, languageWritten, coverImagePath, authorID]
    );


// CRUD - UPDATE books
export const updateBooks = async ({
                                      bookID, bookTitle, originalTitle, yearofPublication,
                                      genre, millionsSold, languageWritten, coverImagePath, authorID
                                  }) => await
    query(
        `
        UPDATE book 
        SET bookTitle = ?, originalTitle = ?, yearofPublication = ?, genre = ?, millionsSold = ?, 
        languageWritten = ?, coverImagePath = ?, authorID = ?
        WHERE bookID NOT IN (1,2,3,4,5,6,7,8,9,10) AND bookID = ?;
        `, [bookTitle, originalTitle, yearofPublication, genre, millionsSold, languageWritten, coverImagePath, authorID, bookID]
    );


// CRUD - DELETE an existing book
export const deleteBook = async ({bookID}) => await
    db.query(
        `
        DELETE FROM book
        WHERE bookID NOT IN (1,2,3,4,5,6,7,8,9,10) AND bookID = ?;
        `, [bookID]
    );
