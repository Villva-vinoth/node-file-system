const express = require("express");
const app = express();
const fileRouter = require('./fileRouter')
const videoRouter = require('./videoRouter')
const imageRouter = require('./iamgeRouter')
const cors = require('cors')
app.use(express.json({ limit: '20mb' }))
app.use(cors())
app.get('/',(req,res)=>{
    res.send({
        message:"Home Active !",
        success: true
    })
})
app.use('/file',fileRouter);
app.use('/video',videoRouter);
app.use('/image',imageRouter);

app.use('/static',express.static('./videoFile/video.mp4'))

app.listen(4000,()=>{
    console.log('server is running on the port '+4000);
})