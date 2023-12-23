import express from "express";
import { loginUserController, signupUserController } from "../controllers/user-controllers.js";
import { authenticateToken } from "../controllers/token-controllers.js";
import { getMentorProfileController, updateMentorProfileController } from "../controllers/mentor-controllers.js";
const Router = express.Router();

Router.post('/signup',signupUserController);
Router.post('/login',loginUserController);
Router.get('/getMentorProfile',authenticateToken, getMentorProfileController);
Router.post('/updateMentorProfile',authenticateToken, updateMentorProfileController);
export default Router