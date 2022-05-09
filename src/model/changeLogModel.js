import {query} from '../database.js';

export const getChangeLogs = async () => await query(
        `
        SELECT CONCAT(DATE(dateCreated), ' ', TIME(dateCreated)) AS dateCreated, 
        CONCAT(DATE(dateChanged), ' ', TIME(dateChanged)) AS dateChanged, bookID, userID
        FROM changelog;
          `
    );

export const createChangeLog = async ({bookID, userID}) => await query(
     `
        INSERT INTO changelog (dateCreated, bookID, userID)
        VALUES (CURRENT_TIMESTAMP, ?, ?);
        `, [bookID, userID]
 );

export const updateChangeLog = async ({bookID, userID, dateChanged}) => await query(
        `
        UPDATE changelog
        SET userID = ?, dateChanged = CURRENT_TIMESTAMP
        WHERE bookID = ?;
        `, [bookID, userID, dateChanged]
    );

