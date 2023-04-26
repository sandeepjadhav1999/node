const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required : true,
        trim: true
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
    status : {
        type :String,
        required:true,
        trim:true,
        default:false
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
},{
    timestamps:true
})

const Task = mongoose.model('task',taskSchema)


module.exports = Task