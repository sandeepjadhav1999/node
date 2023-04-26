const geoCode = require('./ultis/geocde')
const forecast = require('./ultis/forecast')


const address = process.argv[2]

if (!address){
    console.log("please provide a adress")
}
else {
    geoCode(address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return console.log(error)
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
    
            console.log(location)
            console.log(forecastData)
        })
    })
    
}



