// Importing express server, changeLog Model and create an express router
import express from 'express';
import {getChangeLogs} from "../model/changeLogModel.js";
const router = express.Router();

// Route for getting changelog
router.get('/changeLogs', (req, res) => {
   getChangeLogs()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500).json({
                message: "Query Error",
                error: e.message
            });
        });
});

export default router;
