const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=42d276951d9a9dd37d33627d885ca222&query='+latitude+','+longitude+'&units=m'

    request({url, json: true},(error,{body}) => {
            if(error){
                    callback('Unable to connect weather service')
            }
            else if(body.error){
                    callback('Unable to find location')
            }
            else{
                    callback(undefined,body.current.weather_descriptions + '. Temperature is ' +  body.current.temperature+ '. Feels like ' +
                    body.current.feelslike)
            }
    })
}

module.exports = forecast