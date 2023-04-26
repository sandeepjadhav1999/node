const express = require('express')
const User = require('../model/user')
const auth = require('../middleware/auth')
const router = new express.Router()


//get all users
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user)
    
})

//get user by ID 
router.get('/user/:id',async(req,res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user){
            return res.status(400).send('no user found')
        }
        res.status(200).send(user)
    }
    catch (e){
        res.status(500).send('no users!')
    }
    
    
})


// User creation 
router.post("/user", async(req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token =await user.generateToken()
        res.status(200).send({user, token})
    }
    catch (e){
        res.status(500).send(e)
    }
});


// updating users
router.patch('/user/me',auth, async(req,res)=>{
    const update = Object.keys(req.body)
    const allowedUpdate = ['name', 'email', 'password', 'age']
    const isValid = update.every((update)=>allowedUpdate.includes(update))

    if (!isValid) {
        return res.status(400).send(`the given field does not exists, Invalid update`)
    }

    try {
        update.forEach((update)=>{
            req.user[update] = req.body[update]
        })
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new:true,runValidators: true})
        res.send(req.user)
    }

    catch(e){
        res.status(500).send(e)
    }
})


//deleting User
router.delete('/user/me',auth, async(req,res)=>{
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        // if (!user){
        //     return res.status(400).send("no User found!")
        // }
        await req.user.remove()
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})


//user login
router.post('/user/login', async (req,res)=>{
    try{

        const user = await User.findByCreditals(req.body.email, req.body.password)
        const token =await user.generateToken()
        res.send({user, token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})


router.post('/user/logout',auth, async(req,res)=>{
    req.user.tokens = req.user.tokens.filter((token)=>{
        return token.token != req.token
    })
    await req.user.save()
    res.send("Successfully logged out")
})

module.exports = router