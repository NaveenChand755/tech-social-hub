const express = require('express')
const app = express()
const connectDB = require('./config/db')
const path = require('path')


//connect to database
connectDB()  

//Initial middleware
app.use(express.json({extended:false}))






//define routes
app.use('/api/users',require('./routes/api/users'))
app.use('/api/auth',require('./routes/api/auth'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/post'))

//serve static assests for production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'));

    //
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const PORT = process.env.PORT || 5000

app.listen(PORT,()=>
{
    console.log(`Server started on ${PORT}`)
})