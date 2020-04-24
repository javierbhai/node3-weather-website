const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// init express
const app = express()

//Defined Paths for Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const parcialsPath = path.join(__dirname, '../templates/parcials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(parcialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather app',
        name: 'Javier'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Javier'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Javier',
        message: 'this is help page'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'An address should be provided'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })


})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            erro: 'give a search'
        })

    }

    res.send({
        products: []
    })
    console.log(req.query.search)
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        name: 'Javier',
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        name: 'Javier',
        message: 'Page not found'
    })
})

app.listen(3000, () =>{
    console.log('Serder is runing')
})

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'javier',
//         age: 34
//     },
//     {
//         name: 'dana',
//         age: 35
//     }
// ])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })