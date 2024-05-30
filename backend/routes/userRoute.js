const express = require("express")
const userController = require("../controller/userController")
const route = express.Router();
route.post("/create", userController.createUser);
route.get("/getSingleUser/:id", userController.getUserById);
route.get("/getAllUser", userController.getAll);
route.put("/updateUser/:id", userController.updateUser);
route.delete("/delete/:id", userController.deleteUser);
route.delete("/deleteAllUser", userController.deleteAll);
module.exports = route