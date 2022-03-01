const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    UserName: { type: String, required: true, unique: true },
    Balance: { type: Number, required: true, default: 0 },  //we need this field for purchasing subscription
    CreatedAt: { type: String, default: new Date().toLocaleString("en-AU") }
})

module.exports = mongoose.model('User', UserSchema)