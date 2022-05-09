import mysql from 'mysql2';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'book'
});

export const query = (sql, parameters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, parameters, (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results);
            }
        });
    });
}
