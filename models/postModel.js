const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: 'string',
        require: [true, "Post must have title"]
    },
    desc: {
        type: 'string',
        required: [true, "Post must have Description"]
    }
})



const Post = mongoose.model("Post", postSchema);

module.exports = Post