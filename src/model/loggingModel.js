import {query} from "../database.js";

export const showLoggings = async ()  => await
    query(`
    select * from logging;
    `);


export const insertLog = async ({log})  => await
    query(`
    INSERT INTO logging (ip, timestamp, method, totalRequests, endpoint, params) 
    VALUES('${log.ip}', '${log.timestamp}', '${log.method}', '${log.totalRequests}', '${log.endpoint}', '${log.params}');
`);

export const checkTotalRequests = async (ip) => await
    query(
    `SELECT totalRequests FROM logging WHERE ip='${ip}'`
);
