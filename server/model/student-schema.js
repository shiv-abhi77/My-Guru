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
    studentEmail:{
        type:String,
        required:false
    },
    studentContact:{
        type:String,
        required:false
    },
    aboutYourself:{
        type:String,
        required:false
    },
    studentPlans:[{
        planId:{
            type:String,
            required:false
        },
        purchaseDate:{
            type:Date,
            required:false
        },
        active:{
            type:Boolean,
            required:false
        }
    }],
    studentExams:{
        type:[String],
        required:false
    },
    studentMentors:[{
        mentorAccountId:{
            type:String,
            required:false
        },
        status:{
            type:Boolean,
            required:false
        }
    }],
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
    },
    reviewsPosted:{
        type:[String],
        required:false
    },
    ratingGiven:{
        type:[String],
        required:false
    },
    payerId:{
        type:String,
        required:false
    }



})

const student = mongoose.model('student', studentSchema);
export default student;