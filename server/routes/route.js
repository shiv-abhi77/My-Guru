import express from "express";
import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { addLikeController, createCommentController, createPostController, getAllPostsExceptYoursController, getCommentsController, getLikesController, getMentorProfileController, getPostsController, removeLikeController, repostPostController, updateMentorProfileController, updatePostController } from "../controllers/mentor-controllers.js";
import { getImageController, uploadImageController } from "../controllers/image-controllers.js";
import upload from "../middleware/upload.js";
import { bookmarkPostController, getExploredPostsController, getStudentProfileController, removeBookmarkController, updateStudentProfileController } from "../controllers/student-controllers.js";
const Router = express.Router();

Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.get('/getMentorProfile',authenticateToken, getMentorProfileController);
Router.post('/updateMentorProfile',authenticateToken, updateMentorProfileController);
Router.post('/createPost',authenticateToken, createPostController);
Router.post('/repost',authenticateToken, repostPostController);
Router.post('/image/upload', upload.single('file'), uploadImageController);
Router.post('/updatepost', authenticateToken, updatePostController)
Router.get('/file/:filename',getImageController);
Router.delete('/deletepost/:postId', authenticateToken)
Router.get('/getPosts', authenticateToken, getPostsController);
Router.get('/getLikes', authenticateToken, getLikesController);
Router.get('/getAllPostsExcept', authenticateToken, getAllPostsExceptYoursController);
Router.get('/getExploredPosts', authenticateToken, getExploredPostsController);
Router.post('/addComment', authenticateToken, createCommentController);
Router.get('/getComments', authenticateToken, getCommentsController);
Router.post('/addLike', authenticateToken, addLikeController)
Router.post('/removeLike', authenticateToken, removeLikeController)
Router.get('/getStudentProfile',authenticateToken, getStudentProfileController);
Router.post('/updateStudentProfile',authenticateToken, updateStudentProfileController);
Router.post('/bookmarkPost', authenticateToken, bookmarkPostController)
Router.delete('/removeBookmarkPost', authenticateToken, removeBookmarkController)
export default Router