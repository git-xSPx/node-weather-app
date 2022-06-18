const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Me'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        description: 'This is weather forecast site!',
        name: 'Me'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        description: 'Help page!',
        name: 'Me'

    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'In query you mast provide address property!'
        })
    }

    geocode(req.query.address, (error, { location, latitude, longitude } = {}) => {

        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({ error })
            }

            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })

        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorMsg: 'Help article not found!',
        title: 'Help',
        name: 'Me'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorMsg: 'Page not found!',
        title: '404',
        name: 'Me'
    })
})

// Starting Express server
app.listen(3000, () => {
    console.log('Express server up on port 3000')
})