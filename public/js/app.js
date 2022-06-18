console.log('Client side javascript file is loaded!')
/*
fetch('https://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    });
});

const address = 'Boston'
const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoibWFwYm94LXhzcHgiLCJhIjoiY2wzMXlyaWU1MDF6YjNjcnh0NGJlanN1YSJ9.RkC8OXvkcGH57FzDvAWnqw&limit=1'

fetch(geocodeUrl).then((response) => {
    response.json().then((geocodeData) => {

        if (geocodeData.error) {
            return console.log('Error geocoding address: ' + address + '; Error: ', geocodeData.error)
        }

        const [longitude, latitude] = geocodeData.features[0].center
        const forecastUrl = `http://api.weatherstack.com/forecast?access_key=0cd0289d06490b8e8d18932188483675&query=${latitude},${longitude}&units=m`

        console.log('location:', geocodeData.features[0].place_name)

        fetch(forecastUrl).then((response) => {
            response.json().then((forecastData) => {

                if (forecastData.error) {
                    return console.log('Error get forecast data; Error: ', forecastData.error)
                }

                const currentData = forecastData.current

                console.log('forecast:', `${currentData.weather_descriptions[0]}. It is currently ${currentData.temperature} degrees out. It feels like ${currentData.feelslike} degrees out.`)

            })
        })
    })
});
*/


const searchForm = document.querySelector('form')
const select = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = select.value
    if (!location) {
        console.log('Enter you location!')
    } else {

        messageOne.textContent = 'Loading...'
        messageTwo.textContent = ''

        fetch('/weather?address=' + encodeURI(location)).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    //console.log('Error: ', data.error)
                    messageOne.textContent = 'Error: ' + data.error
                } else {
                    //console.log('Location: ', data.location)
                    //console.log('Forecast: ', data.forecast)
                    messageOne.textContent = 'Location: ' + data.location
                    messageTwo.textContent = 'Forecast: ' + data.forecast
                }
            })
        })
    }

})