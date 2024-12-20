const express = require("express");
const app = express();
const fileRouter = require('./fileRouter')


app.use(express.json({ limit: '20mb' }))
app.get('/',(req,res)=>{
    res.send({
        message:"Home Active !",
        success: true
    })
})
app.use('/file',fileRouter);
app.listen(4000,()=>{
    console.log('server is running on the port '+4000);
})