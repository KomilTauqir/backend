import express from 'express';

import {
    getAllComments,
    createComments,
    deleteComment
    
} from "../model/commentModel.js";




const router = express.Router();

router.get('/comments', (req, res) => {
    getAllComments()
        .then((results) => {
            res.status(200).json(results);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json("Query Error");
        });
});


router.post('/comments/create', (req, res) => {
    const data = req.body;

    createComments(
        {
            commentbody: data.commentbody,
            excursionid: data.excursionid,
            userid: data.userid,
           
        }
    )
        .then((result) => {
            res.status(200).json("Commment created successfully");
            

            // console.log(result);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message:"Query Error: Failed to create a new comment",
                    error: e.message
                });
        });
});





router.post('/comments/delete', (req, res) => {
    const comment_id = req.body.comment_id;
    // const comment_id=5;
    deleteComment({comment_id})
        .then((result) => {
            if (result.affectedRows !== 0) {
                res.status(200).json("Comment Deleted Successfully");
            } else {
                res.status(404).json("Comment NOT Found");
            }
        })
        .catch((e) => {
            console.log(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to delete Commenttttt",
                    error: e.message
                });
        });
});



export default router;
