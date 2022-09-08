const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(path.join(__dirname,'../public'));

const app = express();

const port = process.env.PORT || 3002;

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath =  path.join(__dirname,'../templates/views');
const partialsPath =  path.join(__dirname,'../templates/partials');



//Setup Handbelrs & View Locations
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


//Setup Static Directory to Serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Naveed'
    });
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'Naveed',
    });
})


app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        helpText: 'This is some helpful text'
    });
})


app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error, forecastData) => {
            if(error){
                return res.send({error});
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products',(req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Naveed',
        errorMessage: 'Page not found',

    });
})

app.listen(port,() => {
    console.log('Server is up on port'+port);
});