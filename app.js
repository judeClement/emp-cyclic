const express=require('express')
const morgan=require('morgan')
require('dotenv').config()

const cors=require('cors')
const employeeRoutes = require('./Routes/employeeRoutes');
const userRoutes = require('./Routes/userRoutes')

const app=new express()
require('./DB/connection')

const PORT=process.env.PORT

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//deployment
const path = require('path');
app.use(express.static(path.join(__dirname,'/build'))); 


app.use(morgan('dev'));
app.use(cors());
app.use('/api', userRoutes);
app.use('/', employeeRoutes);

app.get('/*', function(req, res) { 
    res.sendFile(path.join(__dirname ,'/build/index.html')); 
}); 

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)  
})   
