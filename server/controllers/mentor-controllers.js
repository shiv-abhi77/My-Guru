import Mentor from '../model/mentor-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Student from '../model/student-schema.js';
import Post from '../model/post-schema.js';


export const getMentorProfileController = async(request, response) => {
    
    try{
        let temp = await Mentor.findOne({mentorAccountId:request.query.mentorAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        return response.status(200).json(temp);
    }
    catch(error){
        return response.status(500).json(error);
    }
}
export const updateMentorProfileController = async (request, response) => {
    try {
        let temp = await Mentor.findOne({mentorAccountId:request.query.mentorAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        for(const key in request.body){
            temp[key] = request.body[key];
        }
        const filter = { mentorAccountId: request.query.mentorAccountId };
        const options = { new: true };
        let updatedMentor = await Mentor.findOneAndUpdate(filter, temp, options);

        if (!updatedMentor) {
            return response.status(409).json({ msg: 'Unsuccessful - Mentor not found' });
        }

        return response.status(200).json(updatedMentor);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: 'Internal server error' });
    }
};
export const createPostController = async(request, response) => {
    let temp = await Mentor.findOne({mentorAccountId:request.query.mentorAccountId});
    if(!temp){
        return response.status(409).json({msg:'unsuccessfull'});
    }
    try {
        const newPost = new Post(request.body);
        await newPost.save();
        temp.mentorPosts.push(newPost._id)
        const options = { new: true };
        console.log(temp)
        await Mentor.findOneAndUpdate({mentorAccountId:request.query.mentorAccountId}, temp, options);
        return response.status(200).json({msg:'created post successfully'})
    } catch (error) {

        console.log(error)
    }
}
export const updatePostController = async(request, response) => {

    try {
        let temp = Post.findOne({_id:request.query.postId});
        if(!temp){
            return response.status(404).json('failed post update not found');
        }
        const options = {new : true}
        await Post.findOneAndUpdate({_id:request.query.postId}, request.body, options);
        return response.status(200).json('success post update');
    } catch (error) {
        return response.status(500).json('failed post updating');
    }
}
export const getPostsController = async(request, response) => {

    try{
        let objArrayOfPosts = [];
        objArrayOfPosts = await Post.find({postAccountId:request.query.mentorAccountId});
        let mentor = await Mentor.findOne({mentorAccountId:request.query.mentorAccountId});
        // let mentor = await Mentor.findOne({mentorAccountId:request.query.mentorAccountId});
        return response.status(200).json({objArrayOfPosts, mentorName:mentor.mentorName, mentorTagline:mentor.mentorTagline, mentorImage:mentor.mentorImage});

    }catch(error){
        return response.status(500).json('failed posts fetching');
    }
}