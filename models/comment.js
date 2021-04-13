const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    post: {type: Schema.Types.ObjectId, ref: "Post", required: true},
    likes: [{type: Schema.Types.ObjectId, ref: "User"}]
})

module.exports = mongoose.model('Comment', CommentSchema);