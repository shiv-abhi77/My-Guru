import mongoose from "mongoose";
const chatSchema = mongoose.Schema({

    mentorAccountId:{
        type:String,
        required:false
    },
    studentAccountId:{
        type:String,
        required:false
    },
    messages:[{
        senderRole:{
            type:String,
            required:false
        },
        messageBody:{
            type:String,
            required:false
        },
        messageTimestamp:{
            type:Date,
            required:false
        },
        seenFlag:{
            type:Boolean,
            required:false
        }
}]




})

const chat = mongoose.model('chat', chatSchema);
export default chat;