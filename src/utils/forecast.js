const request = require('request');


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=d904864bb3da2f338d90a10d42aa11ba&query=' + latitude + ',' + longitude;


    request({ url, json: true }, (error, {body}) => {

        if (error) {
            console.log('Unable to connect to weather service',undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently '+ body.current.temperature + ' degress out. Its Feels Like ' + body.current.feelslike+ ' degress Out there.' );
        }

    });
}

module.exports = forecast;