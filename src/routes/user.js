const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.js");

router.get('/',userController.getAllUsers)

router.get('/:id',userController.getUserById)

router.post('/create',userController.createUser)

router.patch('/update/:id',userController.updateUser)

router.delete('/delete/:id',userController.deleteUser)


module.exports = router;