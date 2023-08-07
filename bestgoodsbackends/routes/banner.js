var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/bannersubmit',upload.single('image'),function(req,res){
 try{
   console.log(req.body)
   console.log(req.file)
  pool.query("insert into banner(description,image,priority) values(?,?,?)",[req.body.description,req.file.originalname,req.body.priority],function(error,result){
      if(error)
      {
        console.log(error)
        res.status(500).json({result:false})
      }
      else
      {
        res.status(200).json({result:true})
      }
  })
 }
 catch(e)
 {
     console.log("Error:",e)
     res.status(500).json({result:false})
 }
})

router.get('/displayallbanner',function(req,res){
    try{
      pool.query("select * from banner",function(error,result){
        if(error)
        {
          res.status(500).json({data:[]})
        }
        else{
            // console.log(result)
          res.status(200).json({data:result})
        }
      })
    }
    catch(e)
    {
      console.log("ERROR:",e)
      res.status(500).json({result:[]})
    }
  })

  router.post('/updatebannerdata',function(req,res){
    try{
      pool.query("update banner set description=?,priority=? where bannerid=?",[req.body.description,req.body.priority,req.body.bannerId],function(error,result){
      console.log(error)
      console.log(result)
        if(error)
        {
          res.status(500).json({result:false})
        }
        else{
          res.status(200).json({result:true})
        }
      })
    }
    catch(e){
      console.log("Error :",e)
      res.status(500).json({result:false})
    }
    })

    router.post('/bannereditpicture',upload.single('image'),function(req,res){
        try{
          console.log(req.body)
          console.log(req.file)
         pool.query("update banner set image=? where bannerid=?",[req.file.originalname,req.body.bannerId],function(error,result){
             if(error)
             {
               console.log(error)
               res.status(500).json({result:false})
             }
             else
             {
               console.log("Result",result)
               res.status(200).json({result:true})
             }
         })
        }
        catch(e)
        {
            console.log("Error:",e)
            res.status(500).json({result:false})
        }
       })

       router.post('/deletebanner',function(req,res){
        try{
          pool.query("delete from banner where bannerid=?",[req.body.bannerId],function(error,result){
          console.log(error)
          console.log(result)
            if(error)
            {
              res.status(500).json({result:false})
            }
            else{
              res.status(200).json({result:true})
            }
          })
        }
        catch(e){
          console.log("Error :",e)
          res.status(500).json({result:false})
        }
        })
      

module.exports=router;