const userModel = require("../model/userModel")

const createUser = async (req, res) => {
    try {
        const userData = new userModel(req.body);

        if (!userData) {
            return res.status(404).json({ msg: "User Data not found" });
        }
        const savedData = await userData.save();
        res.status(201).json(savedData)
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error in create User API")
    }
}


const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const userData = await userModel.findById(id)
        if (!userData) {
            return res.status(404).send({
                message: "User Not Found"
            })

        }
        res.status(200).json({
            success: true,
            user: userData,
            message: "User retrieved Successfully"
        })

    }
    catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error, Problem in getUserById api")
    }
}
const getAll = async (req, res) => {
    try {
        const userData = await userModel.find()
        if (!userData) {
            return res.status(404).send({
                message: "Users Not Found"
            })

        }
        res.status(200).json({
            success: true,
            user: userData,
            message: "User retrieved Successfully"
        })

    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error inn getAll api,InternalServerError")
    }
}

const updateUser = async (req, res) => {
    try {

        const id = req.params.id
        const user = await userModel.findById(id)
        if (!user) {
            return res.status(401).send("User absent in db for which update operation was performed.")
        }
        const newUserData = req.body;
        const updatedData = await userModel.findByIdAndUpdate(id, newUserData, { new: true })

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            oldUserData: user,
            updatedUserData: updatedData
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).send("Error in updateUser Api,  Internal server Error")
    }
}
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if (await userModel.findById(id)) {
            let user = await userModel.findById(id)
            await userModel.findByIdAndDelete(id)
            return res.status(200).json({
                "success": true,
                "message": "User Deleted successfully",
                "user": user
            })
        }
        return res.status(404).send("User not found")
    }

    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
const deleteAll = async (req, res) => {
    try {
        await userModel.deleteMany()
        return res.status(200).json({
            "success": true,
            "message": "All Users Deleted successfully"
        })
    }

    catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}
module.exports = { createUser, getUserById, getAll, deleteUser, deleteAll, updateUser }