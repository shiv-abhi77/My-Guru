import Mentor from '../model/mentor-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Student from '../model/student-schema.js';


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
export const updateMentorProfileController = async(request, response) => {
    
    try{
        console.log(request.body)
        let temp = await Mentor.findOne({mentorAccountId:request.query.mentorAccountId});
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        for(const key in request.body){
            temp[key] = request.body[key];
        }
        await Mentor.findOneAndReplace({mentorAccountId:request.query.mentorAccountId}, temp);
        return response.status(200).json(temp);
    }
    catch(error){
        return response.status(500).json(error);
    }
}