const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {type: String, required: true, maxlength: 20, minlength: 1},
    lastName: {type: String, required: true, maxlength: 20, minlength: 1},
    email: {type: String, required: true},
    password: {type: String, required: true, maxlength: 20, minlength: 1},
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}],
    friendRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
})

module.exports = mongoose.model('User', UserSchema);