const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Setup route handlers
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Matthew Nelson'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Matthew Nelson'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is some example text', 
        title: 'Help',
        name: 'Matthew Nelson'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    };
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: forecastData.description+', '+forecastData.temp,
                location, 
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res)=> {
    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

// Setup /help 404 
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error_message: 'Help article not found', 
        name: 'Matthew Nelson'
    });
});

// Setup 404 page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error_message: 'Page not found',
        name: 'Matthew Nelson'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
});