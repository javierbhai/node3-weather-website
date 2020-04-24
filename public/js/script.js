console.log('Script.js is Running')

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
    fetch('/weather?address=' + location).then( response => {
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


