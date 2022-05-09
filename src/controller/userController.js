import express from 'express';
import bcrypt from 'bcrypt';
import {
    getAllUsers,
    getUserById,
    createUsers,
    updateUser,
    deleteUser,
    getUserByUsername
} from "../model/userModel.js";
import {checkTotalRequests, insertLog} from "../model/loggingModel.js";

const router = express.Router();

router.get('/users', (req, res) => {
    getAllUsers()
        .then((results) => {
            const date = new Date();
            const formattedDate = date.toISOString().split('T')[0];
            let log;
            checkTotalRequests(req.ip).then((results) => {
                console.log(results);
                const param = req.params.id !== undefined ? req.params.id : null;
                log = {
                    ip: req.ip,
                    timestamp: formattedDate,
                    method: req.method,
                    totalRequests: results.length,
                    params: param,
                    endpoint: req.path
                };
                insertLog({log: log}).then((results) => {
                    console.log(results)
                });
            });

            res.status(200).json(results);
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error",
                    error: e.message
                });
        });
});

router.get('/users/:id', (req, res) => {
    getUserById(req.params.id)
        .then((result) => {
            if (result.length > 0) {
                res.status(200)
                    .json(result[0]);
            } else {
                res.status(404)
                    .json("Failed to find UserID");
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: UserID NOT Found",
                    error: e.message
                });
        });
});

router.post('/users/create', (req, res) => {

    // If Statement to handle user access rights
    // if (req.session.user.accessRights !== 'Yes') {
    //     res.status(403).json("Access Rights Error: Failed to Create User");

    //     // Stop this response handler there
    //     return;
    // }

    const user = req.body;

    const hashedPassword = bcrypt.hashSync(user.password, 6);

    createUsers(
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        hashedPassword,
        user.accessRights
    )
        .then(() => {
            res.status(200).json("User created succesfully");
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to create a new User",
                    error: e.message
                });
        });
});

router.post('/users/update', (req, res) => {

    req.session.user.accessRights !== 'Yes' ? res.status(403)
        .json("Access Rights Error: Failed to Edit User") : null;


    const user = req.body;
    let hashedPassword = user.password;

    !user.password.startsWith("$2b$") ? hashedPassword = bcrypt.hashSync(user.password, 6) : null;

    updateUser(
        user.userID,
        user.firstName,
        user.lastName,
        user.email,
        user.username,
        hashedPassword,
        user.accessRights
    )
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200).json("User Updated");
            } else {
                res.status(404).json("User NOT Found");
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to update User", error: e.message
                });
        });
});

router.post('/users/delete', (req, res) => {

    req.session.user.accessRights !== 'Yes' ? res.status(403)
        .json("Access Rights Error: Failed to Delete User") : null;

    const userId = req.body.userID;

    deleteUser(userId)
        .then((result) => {
            if (result.affectedRows > 0) {
                res.status(200)
                    .json({message: "User Deleted Successfully"});
            } else {
                res.status(404)
                    .json({error: "User NOT Found"});
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json({
                    message: "Query Error: Failed to delete User",
                    error: e.message
                });
        });
});

router.post("/users/login", (req, res) => {
    const login = req.body;

    getUserByUsername(login.username)
        .then((results) => {
            if (results) {
                const user = results[0];

                if (bcrypt.compareSync(login.password, user.password)) {
                    req.session.user = {
                        userId: user.userID,
                        accessRights: user.accessRights,
                    }

                    res.status(200)
                        .json('Login Successfully');
                } else {
                    res.status(401)
                        .json('Login Failed');
                }
            } else {
                res.status(404)
                    .json('User NOT Found');
            }
        })
        .catch((e) => {
            console.error(e.message);
            res.status(500)
                .json(
                    {
                        message: 'Query Error: Unable to login',
                        error: e.message
                    });
        });
});

router.post("/users/logout", (req, res) => {

    req.session.destroy();
    res.status(200)
        .json({message: 'Successfully Logged out'});
});

export default router;
