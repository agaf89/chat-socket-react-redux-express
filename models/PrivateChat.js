const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    senders: Array,
    owner: {type: Types.ObjectId, ref: 'User'},
    nameUser: {type: String, required: true},
    date: {type: String, required: true},
    message: {type: String, required: true},
    idForReact: {type: String, required: true}
})

module.exports = model('PrivateChat', schema)