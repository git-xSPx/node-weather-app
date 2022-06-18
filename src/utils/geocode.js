const request = require('postman-request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoibWFwYm94LXhzcHgiLCJhIjoiY2wzMXlyaWU1MDF6YjNjcnh0NGJlanN1YSJ9.RkC8OXvkcGH57FzDvAWnqw&limit=1'

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback('Unable connect to geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        } else {
            const [longitude, latitude] = body.features[0].center
            callback(undefined, { location: body.features[0].place_name, latitude, longitude })
        }

    })
}

module.exports = geocode