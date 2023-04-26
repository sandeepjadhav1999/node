const geoCode = require('./ultis/geocde')
const forecast = require('./ultis/forecast')
const path = require('path')
const hbs = require('hbs')
const express = require('express')


const app = express()
const publicPath= path.join(__dirname, '../public')
const templates = path.join(__dirname,'../templates/views')
const partialstemplates = path.join(__dirname, '../templates/partials')



app.set('view engine','hbs')
app.set('views', templates)
app.use(express.static(publicPath))
hbs.registerPartials(partialstemplates)


app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'sandeep'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'weather app',
        name:'sandeep'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        help:"some useful text",
        title:'weather',
        name:'sandeep'
    })
})
app.get('/weather', (req,res)=>{
    if (!req.query.address){
        return res.send({
            error: 'please provide the address to get the weather report'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error:error})
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if (error) {
                return res.send({error:error})
            }
    
            res.send({
                location : location,
                latitude:latitude,
                longitude:longitude,
                weathe_report: forecastData
            })
        })
    })
} )


app.get('*', (req,res)=>{
    res.render('404', {
        title:'404 page',
        name:'sandeep',
        errormsg:"we are not able to find the required article ur looking for"
    })
})

app.listen(3000, ()=>{
    console.log("server startedon port 3000")
})