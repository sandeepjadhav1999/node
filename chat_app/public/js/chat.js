const socket = io()

// socket.on('countUpdated',(count)=>{
//     console.log('count has been updated', count)    
// })

// document.querySelector('#increment').addEventListener('click',()=>{
//     console.log('clicked')
//     socket.emit('increment')
// })


const $messageform = document.querySelector('#message-form')
const $messageformInput = document.querySelector('input')
const $messageformButton = document.querySelector('button')

const $geolocationButton = document.querySelector('#get-location')

const messages = document.querySelector('#messages')
const message_temples = document.querySelector('#message-template').innerHTML

const location_message_temples = document.querySelector('#location-message-template').innerHTML

socket.on('newConnection',(data)=>{
    console.log(data)
    const html = Mustache.render(message_temples, {
        message : data.text,
        createdAt: moment(data.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
})

socket.on('Currentlocation', (url)=>{
    console.log(url)
    const html = Mustache.render(location_message_temples, {
        url : url.url,
        createdAt: moment(url.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend',html)
})


$messageform.addEventListener('submit', (e)=>{
    e.preventDefault()

    $messageformButton.setAttribute('disabled','disabled')

    const data = e.target.elements.message.value
    socket.emit('dataSent',data, (err)=>{
        $messageformButton.removeAttribute('disabled')
        $messageformInput.value = ''
        $messageformInput.focus()
        if(err){
           return console.log(err)
        }
        console.log('message was delivered')
    })
})

$geolocationButton.addEventListener('click', ()=>{
    if (!navigator.geolocation){
        return alert("your browser does not support geo Location")
    }

    $geolocationButton.setAttribute('disabled','disabled')
    navigator.geolocation.getCurrentPosition((position)=>{
        socket.emit('Location', {
            latitude:position.coords.latitude,
            longitude:position.coords.longitude
        },()=>{
            $geolocationButton.removeAttribute('disabled')
            console.log('location has been shared')
        })
    })
})

