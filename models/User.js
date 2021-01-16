const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    nameUser: {type: String, required: true},
    message: {
        type: Types.ObjectId,
        ref: 'Message'
    },
    resetToken: String,
    resetTokenExp: Date
})

module.exports = model('User', schema)