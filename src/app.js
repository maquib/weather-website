const path = require('path')
const express =  require('express')
const hbs = require('hbs')

const geocode =  require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()

//Define Path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlerbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=> {
    res.render('index', {
        title:"Weather App",
        name: "Mohammad Aquib"
    })
})

app.get('/help',(req,res)=>{
    res.render('help', {
        title:"Help",
        name: "Mohammad Aquib",
        message: 'This is Help page'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title:"About",
        name: "Mohammad Aquib"
    })
})
app.get('/help/*', (req, res)=>{
    res.render('404',{
        title: "Help Article Not Found",
        name:"Mohammad Aquib"
    })
})

// app.get('*',(req,res)=>{
//     res.render('404',{
//         title: "404 Page Not Found",
//         name: "Mohammad Aquib"
//     })
// })



app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error:" You must provide address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {})=>{
        if(error){
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })

    })
    // res.send(
    //     {
    //         forecast: 'Haze',
    //         location: 'Azamgarh',
    //         address: req.query.address
    //     }
    // )
})

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "You must provide search term"
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})
app.listen(3000,()=>{
    console.log('server is up on port 3000.')
})