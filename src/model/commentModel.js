import {query} from '../database.js';
// CRUD - READ ALL Books
export const getAllComments = async () => await
    // Making a query to the database
    query(
        `
        SELECT *
        FROM comment;
        `
    );

// CRUD - CREATE books
export const createComments = async ({
    commentbody, excursionid, userid
}) => await
query(
`
INSERT INTO comment (commentbody, excursionid, userid)
VALUES (?, ?, ?);
`, [commentbody, excursionid, userid]
);

    // CRUD - DELETE an existing excursion
export const deleteComment = async ({comment_id}) => await
query(
    `
    DELETE FROM comment WHERE comment_id =?;`, [comment_id]
);
