const mongodb = require('mongodb')
const MongoDbClient = mongodb.MongoClient


const url ='mongodb://127.0.0.1:27017'
const dbName= 'task-manger'

MongoDbClient.connect(url, {useNewUrlParser:true}, (err, client)=>{
    if (err){
        return console.log('somthing went wrong')
    }

    console.log("-----connected successfully-----")

    const db = client.db(dbName)

    // db.collection('users').insertOne({
    //     name:'sandeep',
    //     age:23
    // })

    // db.collection('task').insertMany([
    //     {
    //         description:'new task created',
    //         completed: false
    //     },
    //     {
    //         description: "updating the task",
    //         completed: false
    //     }
    // ], (err, result)=>{
    //     if (err){
    //         return console.log('something went wrong')
    //     }

    //     console.log(result.acknowledged)
    // })

    // db.collection('task').find().toArray((err,task)=>{
    //     console.log(task)
    // })

    db.collection('task').deleteMany(
        {completed:false}
    ).then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

})