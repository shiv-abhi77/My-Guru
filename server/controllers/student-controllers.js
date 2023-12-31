import Mentor from '../model/mentor-schema.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import token from '../model/token-schema.js'
import Student from '../model/student-schema.js';
import Post from '../model/post-schema.js';
import Comment from '../model/comment-schema.js';

export const getStudentProfileController = async(request, response) => {
    
    try{
        let temp = await Student.findOne({studentAccountId:request.query.studentAccountId});
       
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        return response.status(200).json(temp);
    }
    catch(error){
        return response.status(500).json(error);
    }
}
export const updateStudentProfileController = async (request, response) => {
    try {
        let temp = await Student.findOne({studentAccountId:request.query.studentAccountId});
       
        if(!temp){
            return response.status(409).json({msg:'unsuccessfull'});
        }
        
        for(const key in request.body){
            temp[key] = request.body[key];
        }
        
        const filter = { studentAccountId: request.query.studentAccountId };
        const options = { new: true };
        let updatedStudent = await Student.findOneAndUpdate(filter, temp, options);

        if (!updatedStudent) {
            return response.status(409).json({ msg: 'Unsuccessful - Student not found' });
        }

        return response.status(200).json(updatedStudent);
    } catch (error) {
        console.error(error);
        return response.status(500).json({ msg: 'Internal server error' });
    }
};

export const getExploredPostsController = async(request, response) => {

    try{
        let result = []
        let objArrayOfPosts = [];
        let student  = {}
        let mentor = {}
        if(request.query.userRole === 'student'){
            student = await Student.findOne({studentAccountId:request.query.userAccountId})
            
        }else{
            mentor = await Student.findOne({mentorAccountId:request.query.userAccountId})
        }
        if(student || mentor){                 
            objArrayOfPosts = await Post.find({postAccess:'For all'})
            
            if(request.query.searchQuery === '' && request.query.queryExams === '' && request.query.querySubjects == ''){
                
                if(request.query.userRole === 'student' && student){
                    
                    if(student.studentExams.length === 0 && student.studentSubjects.length === 0) {
                        for(let i = 0; i<objArrayOfPosts.length;i++){
                            
                            if(result.length === 5) break;
                            let mentor = await Mentor.findOne({mentorAccountId:objArrayOfPosts[i].postAccountId})
                            
                            result.push({
                                post:objArrayOfPosts[i],
                                mentorName:mentor.mentorName,
                                mentorTagline:mentor.mentorTagline,
                                mentorImage:mentor.mentorImage,
                        
                            })
                        }
                    }else{
                        if(student.studentExams.length === 0){
                            objArrayOfPosts = objArrayOfPosts.filter((e) => {
                                for(let i = 0; i<e.postSubjects.length;i++){
                                    if(student.studentSubjects.includes(e.postSubjects[i])){
                                        return true
                                    }
                                }
                            })
                        }else if(student.studentSubjects.length === 0) {
                            objArrayOfPosts = objArrayOfPosts.filter((e) => {
                                for(let i = 0; i<e.postExams.length;i++){
                                    if(student.studentExams.includes(e.postExams[i])){
                                        return true
                                    }
                                }
                            })
                        }
                        for(let i = 0; i<objArrayOfPosts.length;i++){
                            
                            let mentor = await Mentor.findOne({mentorAccountId:objArrayOfPosts[i].postAccountId})
                            
                            result.push({
                                post:objArrayOfPosts[i],
                                mentorName:mentor.mentorName,
                                mentorTagline:mentor.mentorTagline,
                                mentorImage:mentor.mentorImage,
                                
                            })
                        }

                    }
                }else if(request.query.userRole === 'mentor' && mentor){
                    if(mentor.mentorExams.length === 0 && mentor.mentorSubjects.length === 0) {
                        for(let i = 0; i<objArrayOfPosts.length;i++){
                            
                            if(result.length === 5) break;
                            let author = await Mentor.findOne({mentorAccountId:objArrayOfPosts[i].postAccountId})
                            
                            result.push({
                                post:objArrayOfPosts[i],
                                mentorName:author.mentorName,
                                mentorTagline:author.mentorTagline,
                                mentorImage:author.mentorImage,
                                
                            })
                        }
                    }else{
                        if(mentor.mentorExams.length === 0){
                            objArrayOfPosts = objArrayOfPosts.filter((e) => {
                                for(let i = 0; i<e.postSubjects.length;i++){
                                    if(mentor.mentorSubjects.includes(e.postSubjects[i])){
                                        return true
                                    }
                                }
                            })
                        }else if(mentor.mentorSubjects.length === 0) {
                            objArrayOfPosts = objArrayOfPosts.filter((e) => {
                                for(let i = 0; i<e.postExams.length;i++){
                                    if(mentor.mentorExams.includes(e.postExams[i])){
                                        return true
                                    }
                                }
                            })
                        }
                        for(let i = 0; i<objArrayOfPosts.length;i++){
                            
                            let author = await Mentor.findOne({mentorAccountId:objArrayOfPosts[i].postAccountId})
                            if(result.length === 5) break;
                            result.push({
                                post:objArrayOfPosts[i],
                                mentorName:author.mentorName,
                                mentorTagline:author.mentorTagline,
                                mentorImage:author.mentorImage,
                               
                            })
                        }

                    }
                }
            }else{
                if(request.query.queryExams !== ''){
                objArrayOfPosts = objArrayOfPosts.filter((e) => {
                    for(let i = 0;i<e.postExams.length;i++){
                        if(request.query.queryExams.includes(e.postExams[i])){
                            return true
                        }
                    }
                })
            }else{
                if(request.query.userRole === 'student'){
                    if(student.studentExams.length>0){
                objArrayOfPosts = objArrayOfPosts.filter((e) => {
                    for(let i = 0; i<e.postExams.length;i++){
                        if(student.studentExams.includes(e.postExams[i])){
                            return true
                        }
                    }
                })
            }
                }else{
                    if(mentor.mentorExams.length>0){
                    objArrayOfPosts = objArrayOfPosts.filter((e) => {
                        for(let i = 0; i<e.postExams.length;i++){
                            if(mentor.mentorExams.includes(e.postExams[i])){
                                return true
                            }
                        }
                    })
                }
            }
            }
            if(request.query.querySubjects !== ''){
                objArrayOfPosts = objArrayOfPosts.filter((e) => {
                    for(let i = 0;i<e.postSubjects.length;i++){
                        if(request.query.querySubjects.includes(e.postSubjects[i])){
                            return true
                        }
                    }
                })
            }else{
                if(request.query.userRole === 'student'){
                    if(student.studentSubjects.length>0){
                    objArrayOfPosts = objArrayOfPosts.filter((e) => {
                        for(let i = 0; i<e.postSubjects.length;i++){
                            if(student.studentSubjects.includes(e.postSubjects[i])){
                                return true
                            }
                        }
                    })
                }
                }else{
                    if(mentor.mentorSubjects.length>0){
                    objArrayOfPosts = objArrayOfPosts.filter((e) => {
                        for(let i = 0; i<e.postSubjects.length;i++){
                            if(mentor.mentorSubjects.includes(e.postSubjects[i])){
                                return true
                            }
                        }
                    })
                }
            }
            }
            if(request.query.searchQuery !== ''){
                let keywordArray = request.query.searchQuery.split(" ")
                
                objArrayOfPosts = objArrayOfPosts.filter((e) => {
                    for(let i = 0; i<keywordArray.length;i++){
                        if(e.postTitle.toLowerCase().includes(keywordArray[i].toLowerCase())){
                            return true
                        }
                    }
                })
                
            }else{
                
            }
            for(let i = 0; i<objArrayOfPosts.length;i++){
                let mentor = await Mentor.findOne({mentorAccountId:objArrayOfPosts[i].postAccountId})
                
                result.push({
                    post:objArrayOfPosts[i],
                    mentorName:mentor.mentorName,
                    mentorTagline:mentor.mentorTagline,
                    mentorImage:mentor.mentorImage,
                })
            }

        } 
    }
        return response.status(200).json({data:result});

    }catch(error){
        return response.status(500).json('failed posts explore');
    }
}

export const bookmarkPostController = async(request, response) => {
        try {
            let post = await Post.findOne({_id:request.query.postId})
            if(request.query.userRole === 'student'){
                let student = await Student.findOne({studentAccountId:request.query.userAccountId})
               
                if(student){
                   student = {...student._doc, studentSavedPosts:[...student._doc.studentSavedPosts, request.query.postId]}
                   
                   post = {...post._doc, postBookmarks:[...post._doc.postBookmarks, request.query.userAccountId]}
                    console.log(student)
                    console.log(post)
                    const options = { new: true };
                  let updatedStudent = await Student.findOneAndUpdate({studentAccountId:request.query.userAccountId}, student, options )
                  if (!updatedStudent) {
                    return response.status(409).json({ msg: 'Unsuccessful - Student not found' });
                }
                let updatedPost = await Post.findOneAndUpdate({_id:request.query.postId}, post, options)
                if(!updatedPost){
                    return response.status(409).json({ msg:'Unsuccessfull - Post not found'})
                }
                return response.status(200).json({msg:'success adding to postBookmarks'})
                }
            }else{
                let mentor = await Mentor.findOne({mentor:request.query.userAccountId})
                if(mentor){
                    mentor = {...mentor._doc, mentorSavedPosts:[...mentor._doc.mentorSavedPosts, request.query.postId]}
                   post = {...post._doc, postBookmarks:[...post._doc.postBookmarks, request.query.userAccountId]}

                   const options = { new: true };
                  let updatedMentor = await Mentor.findOneAndUpdate({mentor:request.query.userAccountId}, mentor, options )
                  if (!updatedMentor) {
                    return response.status(409).json({ msg: 'Unsuccessful - mentor not found' });
                }
                let updatedPost = await Post.findOneAndUpdate({_id:request.query.postId}, post, options)
                if(!updatedPost){
                    return response.status(409).json({ msg:'Unsuccessfull - Post not found'})
                }
                return response.status(200).json({msg:'success adding to postBookmarks'})
                }
            }
        } catch (error) {
            console.log(error)
            return response.status(500).json('failed bookmarking post')
        }
}

export const removeBookmarkController = async(request, response) => {
    try {
        let post = await Post.findOne({_id:request.query.postId})
        if(request.query.userRole === 'student'){
            let student = await Student.findOne({studentAccountId:request.query.userAccountId})
            
            if(student){
                student = {...student._doc, studentSavedPosts:student._doc.studentSavedPosts.filter((e) => {
                    
                    return e !== request.query.postId
                  })}
              console.log(student)

              post = {...post._doc, postBookmarks:post._doc.postBookmarks.filter((e) => {
                return e !== request.query.userAccountId
              })}
              const options = { new: true };
              let updatedStudent = await Student.findOneAndUpdate({studentAccountId:request.query.userAccountId}, student, options )
              if (!updatedStudent) {
                return response.status(409).json({ msg: 'Unsuccessful - Student not found' });
            }
            let updatedPost = await Post.findOneAndUpdate({_id:request.query.postId}, post, options)
            if(!updatedPost){
                return response.status(409).json({ msg:'Unsuccessfull - Post not found'})
            }
            return response.status(200).json({msg:'success adding to postBookmarks'})
            }
        }else{
            let mentor = await Mentor.findOne({mentor:request.query.userAccountId})
            if(mentor){
                mentor = {...mentor._doc, mentorSavedPosts:mentor._doc.mentorSavedPosts.filter((e) => {
                    return e !== request.query.postId
                  })}
              console.log(mentor.mentorSavedPosts)

              post = {...post._doc, postBookmarks:post._doc.postBookmarks.filter((e) => {
                return e !== request.query.userAccountId
              })}
                  const options = { new: true };
              let updatedMentor = await Mentor.findOneAndUpdate({mentor:request.query.userAccountId}, mentor, options )
              if (!updatedMentor) {
                return response.status(409).json({ msg: 'Unsuccessful - mentor not found' });
            }
            let updatedPost = await Post.findOneAndUpdate({_id:request.query.postId}, post, options)
            if(!updatedPost){
                return response.status(409).json({ msg:'Unsuccessfull - Post not found'})
            }
            return response.status(200).json({msg:'success adding to postBookmarks'})
            }
        }
    } catch (error) {
        return response.status(500).json('failed bookmarking post')
    }
}