const Post = require('../models/postModel')



const getAllPosts = async (req, res, next) => {

    try {
        const posts = await Post.find();
        res.status(200).json({ data: posts })
    } catch (e) {
        console.log(e)
        res.status(400).json({ err: "Invalid findall" })
    }
}
//localhost:3000/posts/:id
const getOnepost = async (req, res, next) => {

    try {
        const posts = await Post.findById(req.params.id);
        res.status(200).json({ data: posts })
    } catch (e) {
        console.log(e)
        res.status(400).json({ err: "Invalid getting one" })
    }
}
const createPost = async (req, res, next) => {

    try {
        const posts = await Post.create(req.body);
        res.status(200).json({ data: posts, "response": "Created sucessfuly" })
    } catch (e) {
        console.log(e)
        res.status(400).json({ err: "Failed to create" })
    }
}
const updatePost = async (req, res, next) => {

    try {
        const posts = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ data: posts, "response": "Updated sucessfuly" })
    } catch (e) {
        console.log(e)
        res.status(400).json({ err: "Failed to create" })
    }
}
const deletePost = async (req, res, next) => {

    try {
        const posts = await Post.findByIdAndDelete(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({ "response": "Deleted sucessfuly" })
    } catch (e) {
        console.log(e)
        res.status(400).json({ err: "Failed to create" })
    }
}
module.exports = { getAllPosts, getOnepost, createPost, updatePost, deletePost }