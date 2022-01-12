const express = require('express');
const path =require('path')
const app = express()
const hbs =require('hbs')
const port =process.env.PORT ||3000

const geoCode =require('./utils/geocode')
const forecast =require('./utils/forecast')

//defione paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath =path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//set handle bar engine and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//static directory to serve
app.use(express.static(publicDirectoryPath))


// app.get('/about', (req, res) => {
//     res.send('<h1> About</h1>');
// })

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name :'Ajay varghese'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT page',
        name :'Ajay varghese'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name :'Ajay varghese'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            "Error": "No address found"
        })
        }

    geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})

            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })

    })
    // res.send({
    //     Address: req.query.address,
    //     Forecast:'Raining',
    //     Location:'Boston '
    // });

})

app.get('/products', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            "Error" : "no search term found"
        })
    }

    console.log(req.query)
    res.send({
        products:[]
    });

})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMes :'HelpPage Not found ',
        title:'Error  page',
        name :'Ajay varghese'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMes :'Page Not found 404',
        title:'Error  page',
        name :'Ajay varghese'
    })

})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})