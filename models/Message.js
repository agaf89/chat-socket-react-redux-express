const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    message: {type: String, required: true},
    date: {type: String, required: true},
    owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Message', schema)