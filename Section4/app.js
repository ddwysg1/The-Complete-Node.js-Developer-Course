const yargs = require('yargs');
const axios = require('axios');

var argv = yargs
.options( {
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
})
.help()
.argv;

var originalAddress = argv.address;
var location = encodeURIComponent(originalAddress);
var url = `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBVceVB7R4iRpYTWZcgchGNJ6XTimhWw20`;

axios.get(url).then((response) => {
    if(response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address');
    }

    console.log(response.data.results[0].formatted_address);
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl = `https://api.darksky.net/forecast/d21454c0b738226983d797b8ceb30341/${lat},${lng}`;

    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemp = response.data.currently.apparentTemperature;
    console.log(`It is ${temperature}, it feels like ${apparentTemp}`);
}).catch((e) => {
    if(e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});
