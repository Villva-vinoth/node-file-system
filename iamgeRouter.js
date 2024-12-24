const router = require('express').Router()


router.get('/',(req,res)=>{
    res.send({
        success:true,
        message:"Image fethed Successfully !"
    })
})

module.exports = router