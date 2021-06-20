const express = require('express');
const path  =require('path');
const app= express();
const port =8080; 
const bodyparser =require('body-parser')

// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});

//Defining the Mongooes schema --

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    text1: String,
  });

const contact = mongoose.model('Contact', contactSchema);



//EXPRESS SPECIFic STUFF HERE-->  

app.use( '/static',express.static('static'));
app.use(express.urlencoded());


//PUG SPECIFIC STUFF-->

app.set('view engine','pug');// Setting the template engine as pug
app.set('views',path.join(__dirname,'views')),// kis dir se read karna chate h apne file ko

// ENDPOINTS-->

app.get('/',(req,res)=>
{
    const params= { }; 
    res.status(200).render ('home.pug',params);
})
app.get('/contact',(req,res)=>
{
    const params= { };
    res.status(200).render ('contact.pug',params);
})
app.post('/contact',(req,res)=>
{
    console.log('hello', req);
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send('<script>alert("Your data hase been saved !!")</script>')
        

    })
    
    // res.status(200).render ('contact.pug');
})


app.get('/about',(req,res)=>
{
    const params= { };
    res.status(200).render ('about.pug',params);
})

app.get('/JoinUs',(req,res)=>
{
    const params= { };
    res.status(200).render ('JoinUs.pug',params);
})


// STARTING THE SERVER-->

app.listen(port,()=>
{
    console.log(`the above application has started in the port number ${port}`)
})


//NOTE -- to start this server just use localhost:8080
// to see data in mongoees use mongo --
// show dbs
// use contactAmzon
// show collections
// db.contacts.find()
