import {query} from '../database.js';
// CRUD - READ ALL Books
export const getAllExcursions = async () => await
    // Making a query to the database
    query(
        ` SELECT * FROM excursion;`
    );

// CRUD - CREATE books
export const createExcursions = async ({
    excursionName, dateofexcursion, description
}) => await
query(
`
INSERT INTO excursion (excursion_name, dateofexcursion, description)
VALUES (?, ?, ?);
`, [excursionName, dateofexcursion, description]
);

// CRUD - DELETE an existing excursion
export const deleteExcursion = async ({excursionid}) => await
query(
    `DELETE FROM excursion WHERE excursion_id  = ?;  `, [excursionid]
);
