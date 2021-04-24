
users = []

// Joins user to specific room
function joinUserToRoom(socket_id, username,room){
    const newUser = {socket_id, username,room}
  users.push(newUser)

    return newUser
}


function getCurrentUser(id){
    return users.find(user => user.id === id)
}    


module.exports ={
    joinUserToRoom,
    getCurrentUser
}