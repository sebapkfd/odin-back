const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    text: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    likes: [{type: Schema.Types.ObjectId, ref: "User"}]
})

module.exports = mongoose.model('Post', PostSchema);