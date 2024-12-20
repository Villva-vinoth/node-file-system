const fs = require("fs");
const router = require("express").Router();


if(!fs.existsSync('./file')){
    fs.mkdirSync('./file')
}

router.get("/readSmall", async (req, res) => {
  try {
    const readedFile = await fs.promises.readFile('./file/small-text.txt','utf-8')
    res.send({
        data : readedFile
    })

    // fs.readFile("./small-text.txt", "utf-8", (err, data) => {
    //   if (err) {
    //     throw new Error(err);
    //   }

    //   res.send({
    //     data: data,
    //   });
    // });

  } catch (error) {
    res.send({
      success: false,
      message: error.message || "Internal Server Error !",
    });
  }
});

router.post("/writeSmall", async (req, res) => {
    try { 
        let {data , location } = req.body 
        if(!data || data.length < 0 || !location ){
            throw new Error('Data is Missing !')
        }  

        data += '\n         --- log report writted on '+new Date().toDateString()

        await fs.promises.writeFile(`./file/${location}.txt`,data)

        res.send({
            success:true,
            message: "file created and writed successfully."
        })
    } catch (error) {
      res.send({
        success: false,
        message: error.message || "Internal Server Error !",
      });
    }
});


router.patch('/appendSmall',async(req,res)=>{
    try {

        let { data , location } = req.body

        if(!data || data.length < 0 || !location){
            throw new Error('Data is Missing !')
        }

        data += '\n         --- log report updated on'+new Date().toString()


        await fs.promises.appendFile(`./file/${location}.txt`,data)
        res.send({
            success:true,
            message:"File Append or Created and Written successfully !"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message || "Internal Server Error !",
          });
    }
})


router.delete('/deleteSmall',async (req,res)=>{
    try {
        const {location} = req.body

        if(!location){
            throw new Error('Data is Missing !')
        }
        if(fs.existsSync(`./file/${location}.txt`)){
          await fs.promises.unlink(`./file/${location}.txt`)
        }

        res.send({
            success:true,
            message:"File deleted successfully !"
        })

    } catch (error) {
        res.send({
            success: false,
            message: error.message || "Internal Server Error !",
          });
    }
})

router.get('/readFile',(req,res)=>{
    try {
        console.time('addS')
        const read = fs.createReadStream('./file/large-text.txt')
        read.on('data',(chuck)=>{
            res.write(chuck)
        })
        read.on('end',(data)=>{
            console.timeEnd('addS')
            res.end()
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message || "Internal Server Error !",
          });
    }
})

router.get("/readLarge", async (req, res) => {
    try {
        console.time('add')
      const readedFile = await fs.promises.readFile('./file/large-text.txt','utf-8')
      res.send(
         readedFile
      )
      console.timeEnd('add')
    } catch (error) {
      res.send({
        success: false,
        message: error.message || "Internal Server Error !",
      });
    }
});

router.get('/readFilePipe',(req,res)=>{
  try {
      console.time('addS')
      const read = fs.createReadStream('./file/large-text.txt')
      read.pipe(res)
  } catch (error) {
      res.send({
          success: false,
          message: error.message || "Internal Server Error !",
        });
  }
})


router.post('/writeFile',(req,res)=>{
  try {
    const { data ,location } = req.body;
    console.log("chars :",data.length)
    if(!data || data.length<0 || !location){
      throw new Error("Data is Missing !")
    }
     const writeFile = fs.createWriteStream(`./file/${location}1.txt`)
    //  writeFile.write(data,'utf-8',() =>{
    //   console.log('successfully !',data)
    //  })
    //  writeFile.on('error',(error) =>{
    //   throw new Error(error)
    //  })
    //  writeFile.end(()=>{
    //   console.log("success")
    //   res.send({
    //     success:true,
    //     message:"file created and writtern successfully !"
    //   })
    //  })


    writeFile.write(data)
    writeFile.on('error',(error)=>{
      throw new Error(error)
    })
    writeFile.end()

    res.send({
      success:true,
      message:"File Success"
    })

  } catch (error) {
    res.send({
      success: false,
      message: error.message || "Internal Server Error !",
    });
  }
})



// readFile and readFilePipe both are same. 

// readLarge and readFile has difference in Waiting Time.


module.exports = router;
