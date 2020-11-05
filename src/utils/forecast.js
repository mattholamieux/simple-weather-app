const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=d5b06592db67ddb78afb062c8765ef37&query=' + latitude + ',' + longitude + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to weather service', undefined);
        } else if (body.error){
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                precip: body.current.precip,
                description: body.current.weather_descriptions[0]
            });
        }
    })
}

module.exports = forecast;