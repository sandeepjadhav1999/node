const request = require('request')


const geoCode = (address, callback)=>{
    const url= 'http://api.positionstack.com/v1/forward?access_key=6053d6e90abee4729cd61f0410270a85&query='+encodeURIComponent(address)+'&limit=1'

    request ({url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to get the weather report',undefined)
        }
        else if(body.data.length === 0){
            callback('unable to find the loaction, Try another location', undefined)
        }
        else {
           callback(undefined, {
            latitude: body.data[0].latitude,
            longitude:body.data[0].longitude,
            location:body.data[0].name
           })

        }
    })
}


module.exports= geoCode