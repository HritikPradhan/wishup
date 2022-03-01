const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController')
const subscriptionController = require('../controllers/subscriptionController')
//USER
router.post('/User',userController.createUser);
router.get('/User/:userName',userController.getUser);
router.put('/User/:userName',userController.balanceUpdate)

//SUBSCRIPTION
router.post('/subscription',subscriptionController.BuySubscription)
router.get('/subscription/:userName',subscriptionController.getSubscriptionDetail)



module.exports = router;