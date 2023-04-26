const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager',)

const task = mongoose.model('task',{
    description: {
        type :String,
        trim: true,
        required : true,
        
        
    },
    completed:{
        type : Boolean,
        required: true,
        default : false
    }
})
