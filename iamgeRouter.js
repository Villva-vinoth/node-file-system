const router = require('express').Router()
const fs = require('fs')

router.get('/',(req,res)=>{

   try {
    fs.readFile('./imageFile/nature.jpeg' ,(err,image)=>{
        if(err){
            throw new Error(err)
        }
        const base64Image = image.toString('base64');

        // Send as JSON with base64-encoded image
        res.json(
            // {
        //   success: true,
        //   message: "Image fetched successfully!",    
        //   image: 
          `data:image/jpeg;base64,${base64Image}`,
        // }
    );
    })

    
   } catch (error) {
    res.send({
        success: false,
        message: error.message || "Internal Server Error !",
      });
   }
})

router.get('/crs',(req,res)=>{

    try {
     const image  = fs.createReadStream('./imageFile/nature.jpeg')
     image.pipe(res)
    } catch (error) {
     res.send({
         success: false,
         message: error.message || "Internal Server Error !",
       });
    }
 })

module.exports = router