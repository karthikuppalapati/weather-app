const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const publicDirPath = path.join(__dirname,'../public') 
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set("views", viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Weather',
        name: 'Karthik Uppalapati'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Karthik Uppalapati'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        text: 'This is helpful',
        name: 'Karthik Uppalapati'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geoCode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
             return res.send({
                 error: 'Provide a valid address'
             })
        }
        forecast(latitude,longitude,(error,forecastData) => {
                if(error){
                    return res.send({
                        error: 'Unable to fect forecast'
                    })
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address
                })
        })
})
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Karthik Uppalapati',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'karthik',
        errorMessage: '404 Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up and running')
})