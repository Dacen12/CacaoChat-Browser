

var roomInputField = document.querySelector('.room')
var usernameInputField = document.querySelector('.username')
var button  = document.getElementById('button')
var form = document.getElementById('goPost')
const {username, room} = qs.parse(location.search, {
    ignoreQueryPrefix: true
})


form.addEventListener('submit', (e) => {

form.reset()
    
})
