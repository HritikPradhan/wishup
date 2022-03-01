const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({

    UserName: { type: String, required: true },
    Plan: {
        type: String,
        required: true
    },
    StartDate: { type: String, required: true },
    ValidTill: { type: Date }
})

module.exports = mongoose.model('Subscribe', SubscriptionSchema)