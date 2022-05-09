// Importing express server, changeLog Model and create an express router
import express from 'express';
import {checkTotalRequests, showLoggings} from "../model/loggingModel.js";
const router = express.Router();

// Route for getting changelog

router.get('/logging/:ip', (req, res) => {
    checkTotalRequests(req.params.ip)
    
        .then((result) => {
            if (result.length > 0) {
                res.status(200)
                    .json(result[0]);
            } else {
                res.status(404)
                    .json({message: "Failed to find BookID"});
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: BookID NOT Found",
                    error: e.message
                });
        });
});




router.get('/loggings', (req, res) => {
    showLoggings()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});


export default router;