const mongoose = require('mongoose')

const SubscriptionSchema = new mongoose.Schema({

    UserName: { type: String, required: true },
    Plan: {
        type: String,
        required: true,
        enum: ["FREE", "TRIAL", "LITE_1M", "PRO_1M", "LITE_6M", "PRO_6M"]
    },
    StartDate: { type:String, required: true },
    ValidTill: { type: Date }
})

module.exports = mongoose.model('Subscribe', SubscriptionSchema)