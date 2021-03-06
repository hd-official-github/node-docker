const express = require('express');
const postController = require('../controller/PostController')
const protect = require('../middleware/authMiddleware')
const router = express.Router();

//localhost:3000/

router.route('/').get(protect, postController.getAllPosts).post(protect, postController.createPost)

router.route('/:id').get(postController.getOnepost).post(postController.updatePost).delete(postController.deletePost)

module.exports = router;

