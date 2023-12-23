import mongoose from "mongoose";
const reviewSchema = mongoose.Schema({

    reviewAccountId:{
        type:String,
        required:false
    },
    reviewMentorId:{
        type:String,
        required:false
    },
    reviewBody:{
        type:String,
        required:false
    },
    reviewTimestamp:{
        type:Date,
        required:false
    },



})

const review = mongoose.model('review', reviewSchema);
export default review;