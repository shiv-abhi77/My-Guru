import mongoose from "mongoose";
const commentSchema = mongoose.Schema({

    commentAccountId:{
        type:String,
        required:false
    },
    commentBody:{
        type:String,
        required:false
    },
    commentTimestamp:{
        type:Date,
        required:false
    },
    commentPostId:{
        type:String,
        required:false
    }



})

const comment = mongoose.model('comment', commentSchema);
export default comment;