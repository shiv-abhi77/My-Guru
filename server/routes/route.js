import express from "express";
import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { createPostController, getMentorProfileController, getPostsController, updateMentorProfileController, updatePostController } from "../controllers/mentor-controllers.js";
import { getImageController, uploadImageController } from "../controllers/image-controllers.js";
import upload from "../middleware/upload.js";
const Router = express.Router();

Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.get('/getMentorProfile',authenticateToken, getMentorProfileController);
Router.post('/updateMentorProfile',authenticateToken, updateMentorProfileController);
Router.post('/createPost',authenticateToken, createPostController);
Router.post('/image/upload', upload.single('file'), uploadImageController);
Router.post('/updatepost', authenticateToken, updatePostController)
Router.get('/file/:filename',getImageController);
Router.get('/getPosts', authenticateToken, getPostsController);
export default Router