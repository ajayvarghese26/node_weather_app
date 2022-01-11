const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1925b11a9ae43d928ea1f19e96e85c05&query=' + long + ',' + lat + '&units=f';
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback("not able to get wether info")
        }
        else if (body.error){
            callback("unable to find location")
        }
        else{
            callback(undefined,"it is currently "+body.current.temperature+" degress out. It feels like "+body.current.feelslike+" degress out")
        }

    })
}

module.exports=forecast