const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = `http://api.weatherstack.com/forecast?access_key=0cd0289d06490b8e8d18932188483675&query=${latitude},${longitude}&units=m`

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            const currentData = body.current
            callback(undefined, `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees out. It feels like ${currentData.feelslike} degrees out.`)
        }

    })

}

module.exports = forecast