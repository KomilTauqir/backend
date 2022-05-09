import {query} from '../database.js';

export const getAllAuthors = async () => await
    query(
        `
        SELECT authorID, name, surname, nationality, birthYear, deathYear
        FROM author;
        `
    );

export const getAuthorById = async ({id}) => await
    query(
        `
        SELECT authorID, name, surname, nationality, birthYear, deathYear
        FROM author
        WHERE authorID = ?;
        `, [id]
    );

export const createAuthors = ({name, surname, nationality, birthYear, deathYear}) =>
    query(
        `
        INSERT INTO author (name, surname, nationality, birthYear, deathYear)
        VALUES (?, ?, ?, ?, ?);
        `, [name, surname, nationality, birthYear, deathYear]
    );

export const updateAuthors = ({authorID, name, surname, nationality, birthYear, deathYear}) =>
    query(
        `
        UPDATE author 
        SET name = ?, surname = ?, nationality = ?, birthYear = ?, deathYear = ? 
        WHERE authorID NOT IN (1,2,3,4,5,6,7,8,9) AND authorID = ?;
        `, [name, surname, nationality, birthYear, deathYear, authorID]
    );

export const deleteAuthor = ({authorID}) =>
    query(
        `
        DELETE FROM author
        WHERE authorID NOT IN (1,2,3,4,5,6,7,8,9) AND authorID = ?;
        `, [authorID]
    );

