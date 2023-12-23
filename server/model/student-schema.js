import mongoose from "mongoose";
const studentSchema = mongoose.Schema({

    studentAccountId:{
        type:String,
        required:false
    },
    studentName:{
        type:String,
        required:false
    },
    studentContact:{
        type:String,
        required:false
    },
    education :[{
        schoolName : {
            
            type:String,
            required:false,

        },
        course:{
            type:String,
            required:false,

        },
        startYear:{
            type:Date,
            required:false
        },
        finishYear:{ 
            type:Date,
            required:false
        },
        grade:{
            type:String,
            required:false
        }
}],
    studentExams:{
        type:[String],
        required:false
    },
    studentMentors:{
        type:[String],
        required:false
    },
    studentSavedPosts:{
        type:[String],
        required:false
    },
    studentLikedPosts:{
        type:[String],
        required:false
    },
    studentSubjects:{
        type:[String],
        required:false
    },
    studentChats:{
        type:[String],
        required:false
    }



})

const student = mongoose.model('student', studentSchema);
export default student;