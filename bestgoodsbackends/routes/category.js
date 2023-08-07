var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/categorysubmit',upload.single('icon'),function(req,res){
 try{
   console.log(req.body)
   console.log(req.file)
  pool.query("insert into categories(categoryname,icon) values(?,?)",[req.body.categoryname,req.file.originalname],function(error,result){
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

router.get('/displayallcategory',function(req,res){
  try{
    pool.query("select * from categories",function(error,result){
      if(error)
      {
        res.status(500).json({data:[]})
      }
      else{
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

router.post('/updatecategorydata',function(req,res){
try{
  pool.query("update categories set categoryname=? where categoryid=?",[req.body.categoryName,req.body.categoryId],function(error,result){
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

router.post('/categoryeditpicture',upload.single('icon'),function(req,res){
  try{
    console.log(req.body)
    console.log(req.file)
   pool.query("update categories set icon=? where categoryid=?",[req.file.originalname,req.body.categoryId],function(error,result){
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

 router.post('/deletecategory',function(req,res){
  try{
    pool.query("delete from categories where categoryid=?",[req.body.categoryId],function(error,result){
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