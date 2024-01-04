import mongoose from "mongoose";
const subscriptionSchema = mongoose.Schema({

    studentAccountId:{
        type:String,
        required:false
    },
    mentorAccountId:{
        type:String,
        required:false
    },
    planId:{
        type:String,
        required:false
    },
    purchaseTimestamp:{
        type:Date,
        required:false
    },
    amount:{
        type:Number,
        required:false
    },
    status:{
        type:Boolean,
        required:false
    }



})

const subscription = mongoose.model('subscription', subscriptionSchema);
export default subscription;