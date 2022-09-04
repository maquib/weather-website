const request = require('request')
const forecast = (longitude,latitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=eb293957115ffcaf40ae183819ee9c5f&query='+latitude+',' +longitude+''
    
    request({url, json: true}, (error, {body} = {}) => {
        if(error){
            callback('Unable to connect forecast services!', undefined)
        }else if(body.error) {
            callback('Unable to find Location, Try another search', undefined)
        }else{
            callback(undefined, 
                  body.current.weather_descriptions[0]+ ". It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out",
            )
        }
    })
}

module.exports = forecast