import express from 'express';

import {
    getAllExcursions,
    deleteExcursion,
    createExcursions,

} from "../model/excursionModel.js";

const router = express.Router();

router.get('/excursions', (req, res) => {
    getAllExcursions()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});



router.post('/excursions/delete', (req, res) => {
    const excursionid = req.body.excursion_id;

    deleteExcursion({ excursionid })
        .then((result) => {
            if (result.affectedRows !== 0) {
                res.status(200).json("Excursion Deleted Successfully");
            } else {
                res.status(404).json("Excursion NOT Found");
            }
        })
        .catch((e) => {
            console.log(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to delete Excursion",
                    error: e.message
                });
        });
});

router.post('/excursions/create', (req, res) => {
    const data = req.body;

    createExcursions(
        {
            excursionName: data.excursionName,
            dateofexcursion: data.dateofexcursion,
            description: data.description,

        }
    )
        .then((result) => {
            res.status(200).json("Excursion created successfully");


            // console.log(result);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to create a new excursion",
                    error: e.message
                });
        });
});





// router.post('/excursions/delete', (req, res) => {
//     const data = req.body;

//     deleteExcursion({excursionId:data.excursionId})
//         .then((result) => {
//             if (result.affectedRows !== 0) {
//                 res.status(200).json("Excursion Deleted Successfully");
//             } else {
//                 res.status(404).json("Excursion NOT Found");
//             }
//         })
//         .catch((e) => {
//             console.log(e.message);
//             res.status(500)
//                 .json({
//                     message: "Query Error: Failed to delete Excursion",
//                     error: e.message
//                 });
//         });
// });



export default router;
