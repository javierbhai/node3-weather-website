const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/current?access_key=bb7e7ff396ce980bfe28a9a650e0271f&query=${latitude},${longitude}`

    request({url, json: true}, (error, response, body) => {

        if (error) {
            callback('Not able to connect to the server', undefined)
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, `It is currenly ${body.current.temperature} degrees out and feel like ${body.current.feelslike} degrees out, the wind speed is ${body.current.wind_speed}`)
        }
    });

}

module.exports = forecast