const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const Filter = require('bad-words')
const {generateMessage, generateLocation} = require('./utlis/message')


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = 3000
const publicDirectoryPath = path.join(__dirname, '../public')



app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('new connection');

    socket.emit('newConnection',generateMessage('welcome'))
    socket.broadcast.emit('newConnection', generateMessage('A new user has joined'))

    // socket.emit('countUpdated', count)
    // socket.on('increment',()=>{
    //     count++
    //     //socket.emit('countUpdated',count)
    //     io.emit('countUpdated',count)
    // })

    socket.on('dataSent',(data , callback)=>{
        const filter = new Filter()

        if (filter.isProfane(data)){
            return callback('profanity is not allowed')
        }
        io.emit('newConnection',generateMessage(data))
        callback()
    })

    socket.on('Location',(corrds, callback)=>{
        io.emit('Currentlocation', generateLocation(`https://google.com/maps?q=${corrds.latitude},${corrds.longitude}`))
        callback()
    })

    socket.on('disconnect', ()=>{
        io.emit('newConnection',generateMessage('A User has left '))
    })
  });

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})