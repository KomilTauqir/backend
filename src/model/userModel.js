import {query} from "../database.js";

export const getAllUsers = () =>
    query(
        `
        SELECT userID, firstName, lastName, email, username, password, accessRights
        FROM users;
        `
    );

export const getUserById = async (id) => await
    query(
        `
        SELECT userID, firstName, lastName, email, username, password, accessRights
        FROM users
        WHERE userID = ?;
        `, [id]
    );

export const getUserByUsername = async (username) => await
    query(
        `
        SELECT userID, firstName, lastName, email, username, password, accessRights
        FROM users
        WHERE username = ?;
        `, [username]
    );

export const createUsers = async (firstName, lastName, email, username, password, accessRights) => await
    query(
        `
        INSERT INTO users (firstName, lastName, email, username, password, accessRights)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [firstName, lastName, email, username, password, accessRights]
    );

export const updateUser = async (userID, firstName, lastName, email, username, password, accessRights) => await
    query(
        `
        UPDATE users 
        SET firstName = ?, lastName = ?, email =?, username =?, password = ?, accessRights = ?
        WHERE userID = ?;
        `, [firstName, lastName, email, username, password, accessRights, userID]
    );

export const deleteUser = async (userID) => await
    query(
        `
        DELETE FROM users
        WHERE userID = ?;
        `, [userID]
    );

