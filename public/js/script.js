console.log('Script.js is Running')

// fetch('http://puzzle.mead.io/puzzle').then( response => {
//     response.json().then( data => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form');
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value;
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''

    if(!location){
        return messageOne.textContent = 'No location provited'
    }
    fetch('http://localhost:3000/weather?address=' + location).then( response => {
        response.json().then( ({ error, forecast, location }) => {

            if ( error ) {
                messageOne.textContent = error
            } else {
                messageOne.textContent = location
                messageTwo.textContent = forecast
            }
        })
    })
})


