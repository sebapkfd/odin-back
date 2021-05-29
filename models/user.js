const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}],
    friendRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    facebookId: {type: String, required: false}
})

module.exports = mongoose.model('User', UserSchema);