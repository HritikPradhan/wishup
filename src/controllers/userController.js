const userModel = require('../models/userModel')


const createUser = async function (req, res) {
    try {
        let data = req.body
        let createuser = await userModel.create(data)
        return res.status(201).send({ status: "Success", Data: createuser })

    } catch (error) {
        return res.status(500).send({ status: "Failure", message: error.message });
    }
}

const getUser = async function (req, res) {
    try {
        let data = req.params.userName
        let finduser = await userModel.findOne({ UserName: data }).select({ __v: 0, _id: 0 })
        if (!finduser) {
            return res.status(404).send({ status: "Failure", message: "Sorry Unable To Find The User Detail" })
        }
        return res.status(200).send({ status: "Success", Data: finduser })
    } catch (error) {
        return res.status(500).send({ status: "Failure", message: error.message });
    }
}

const balanceUpdate = async function (req, res) {
    try {
        let User = req.params.userName
        let userexist = await userModel.findOne({ UserName: User })
        if (!userexist) {
            return res.status(404).send({ status: "Failure", message: "User Doesn't Exist" })
        }
        let data = req.body
        let {Balance} = data
        if(Balance<=0){
            return res.status(400).send({ status: "Failure", message: "Please Add A Valid Amount" })
        }
        let userbalance=userexist.Balance
        let updatedbalance=userbalance+Balance
        let update = await userModel.findOneAndUpdate({UserName:User},{Balance:updatedbalance})
        if(!update){
            return res.status(404).send({ status: "Failure", message: "Unable To Credit" })
        }
        return res.status(200).send({status:"Success",message:`Your Account Has Been Creadited Of Amount ${Balance} $`,CurrentBalance:updatedbalance})
    } catch (error) {
        return res.status(500).send({ status: "Failure", message: error.message });
    }
}

module.exports = { createUser, getUser, balanceUpdate }