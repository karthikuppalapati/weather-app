const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoia2FydGhpazU0NzMiLCJhIjoiY2tweHl4d3Q3MGF2MzJ3cWNlOTc5eG15MCJ9.uA-V4_3q4A1sZYNpN6JxQQ'
    request({url, json: true}, (error, {body}) =>{
            if(error){
                    callback('Unable to connect to geocode services')
            }else if(body.features.length==0){
                    callback('Unable to find location. Try another search')
            }else{
                    callback(undefined,{
                            latitude:body.features[0].center[1],
                            longitude:body.features[0].center[0],
                            location:body.features[0].place_name
                    })
            }
    })
}

module.exports = geoCode