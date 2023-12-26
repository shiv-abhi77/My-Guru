import mongoose from "mongoose";
const postSchema = mongoose.Schema({

    postAccountId:{
        type:String,
        required:false
    },
    postLikes:{
        type:[String],
        required:false
    },
    postReposts:{
        type:[String],
        required:false
    },
    postComments:{
        type:[String],
        required:false
    },
    postTitle:{
        type:String,
        required:false
    },
    postBody:{
        type:String,
        required:false
    },
    postImage:{
        type:String,
        required:false
    },
    postTimestamp:{
        type:Date,
        required:false
    },



})

const post = mongoose.model('post', postSchema);
export default post;