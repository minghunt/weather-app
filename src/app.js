import express from 'express'
import hbs from 'hbs'
import path from 'path';
import { fileURLToPath } from 'url';
import * as untils from './untils/untils.js'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Minh Hung'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Minh Hung'
    }) 
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpText:'Help text.',
        title:'Help',
        name:'Minh Hung'
    })
})   
app.get(`/weather`, (req, res) => {
    if (!req.query.address)
    {
        return res.send({
            error:'You must provide an address'
        })
    }
 
    untils.geocode(req.query.address, (error, { latitude, longtitude, location }={}) => {
        if (error)
            return res.send({error})
        else {
            untils.forecast(latitude, longtitude, (error, forecastData) => {
                if (error)
                    return console.log(error)
                console.log(location)
                console.log(forecastData)
                res.send({
                    forecast:forecastData,
                    location:location,
                    address:req.query.address
                })
            })
        }
    })

    
}) 
app.get(`/help/*`, (req, res) => {
    res.render('404',{
        errorMessage:'Help article not found',
        title:'404',
        name:'Minh Hung' 
    }) 
})  
app.get(`*`, (req, res) => {
    res.render('404',{
        errorMessage:'Page not found',
        title:'404',
        name:'Minh Hung'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})