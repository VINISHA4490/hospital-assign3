const express=require('express')
const  hospitaldataRouter=require('./routes/hospitalRoute')

const app=express()

const PORT=3000;

app.use(express.json())



app.use('/hospitaldata',hospitaldataRouter)
app.get('/',(req,res)=>{
    res.send('from hospitals API')
})


app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})