const { json } = require('express')
const express = require('express')
const http = require('http')
const path = require('path')
const app = express()
const server  = http.createServer(app)
const socket = require('socket.io')(server)


const {joinUserToRoom} = require('./client/class/User')

app.use(express.json())
console.log("updated version!")
socket.on("connection", socket => {

        socket.on('MobileRoomJoined', (username, mobile_room) => {
            socket.join(mobile_room)
            
        const user = joinUserToRoom(socket.id, username ,mobile_room)
        
        socket.on("messageToOthers", (username, message) => {
           
            socket.broadcast.in(user.room).emit('receivedMessage', ({username, message}))
        })
    })

    socket.on('roomJoined', ({username, room}) => {
        console.log(`computer : ${username} +  ${room}`)
         socket.join(room)
        
       const user = joinUserToRoom(socket.id, username ,room)
      console.log(`user is : ${user.username} inside room : ${user.room}`)
        
       socket.on('messageToOthers', ({username, message})=> {
           console.log("inside message from others: " +username + 'and the message is: ' + message)
           socket.broadcast.in(user.room).emit('receivedMessage', ({username, message}))
       })
    
    })

})

app.use(express.static(path.join(__dirname, '/client/'), {index: 'index.html'}))

server.listen(process.env.PORT || 3000,  () => {
    console.log('listening on port ' + process.env.PORT)
})

