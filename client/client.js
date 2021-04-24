var io = require('socket.io-client'),ioClient = io.connect()
var submitText = document.getElementById('submitText')
var form = document.getElementById('form')
var chatScreen = document.getElementById('chatScreen')
var ulList = document.getElementById('ulList')
var sendButton  = document.getElementById('send')



const {room, username} = require('qs').parse(location.search, {
    ignoreQueryPrefix: true
})
 

ioClient.emit('roomJoined', (username, room) )


form.addEventListener('submit', (e) => {
    e.preventDefault()
    var message = submitText.value
    
    ioClient.emit('messageToOthers', (username, message))
   
    addMessage(username , message)
    submitText.value = ""
})


ioClient.on('receivedMessage', ({mobile_username}, message) => {
   
   addMessage(mobile_username, message)
})
 
// adds received message to dom
function addMessage(username, message){
    var addLi = document.createElement('li')
    addLi.innerText = `${username} : ${message}`
    addLi.classList.add('messageBox')
    ulList.appendChild(addLi)
    chatScreen.scrollTop = chatScreen.scrollHeight;
}