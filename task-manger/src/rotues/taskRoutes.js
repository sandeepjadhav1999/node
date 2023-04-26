const express = require('express')
const Task = require('../model/task')
const auth = require('../middleware/auth')
const router = new express.Router()


// Task creation
router.post("/task",auth,async(req,res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})



//get all tasks
router.get('/tasks',auth, async(req,res)=>{
    try{
        const tasks = await Task.find({owner: req.user._id}).sort({createdAt:-1})
        if (!tasks){
            return res.status(400).send("no tasks found")
        }
        res.send(tasks)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})

//get task by ID 
router.get('/task/:id',auth,async(req,res)=>{
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id , owner:req.user._id})
        if (!task){
            return res.status(400).send("no tasks found")
        }
        res.send(task)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})


// updating task
router.patch('/task/:id',auth, async(req,res)=>{
    const update = Object.keys(req.body)
    const allowedUpdate = ['title','description','status']
    const isValid = update.every((update)=>allowedUpdate.includes(update))

    if (!isValid) {
        return res.status(400).send(`the given field does not exists, Invalid update`)
    }

    try {
        const task = await Task.findOne({_id:req.params.id, owner:req.user._id})
        if (!task){
            return res.status(400).send('no user found')
        }
        update.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})

// deleting task
router.delete('/task/:id',auth, async(req,res)=>{
    try {
        //const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id:req.params.id , owner:req.user._id})
        if (!task){
            return res.status(400).send("no User found!")
        }

        res.send(task)
    }
    catch(e){
        res.status(500).send(e)
    }
})


module.exports = router