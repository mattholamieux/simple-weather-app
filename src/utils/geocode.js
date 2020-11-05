const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWF0dGhvbGFtaWV1eCIsImEiOiJja2UwbzY1Y3AyZWx4MnhtY2N6OTVxanMzIn0.hAGScSSOzQ68RRBoeGRXww&limit=1';
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('unable to connect to location services', undefined);
        } else if (body.features.length === 0){
            callback('unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;