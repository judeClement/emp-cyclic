const mongoose=require('mongoose')
mongoose.connect(process.env.mongodb_url)
.then(()=>{
    console.log('connected to db')
})     

.catch((err)=>{
    console.log(err)
   })    