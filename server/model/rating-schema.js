import mongoose from "mongoose";
const ratingSchema = mongoose.Schema({

    ratingAccountId:{
        type:String,
        required:false
    },
    ratingValue:{
        type:Number,
        required:false
    },
    ratingMentor:{
        type:String,
        required:false
    }



})

const rating = mongoose.model('rating', ratingSchema);
export default rating;