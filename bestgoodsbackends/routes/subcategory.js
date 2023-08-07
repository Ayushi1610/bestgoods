var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/subcategorysubmit',upload.single('picture'),function(req,res){
pool.query("insert into subcategories(categoryid,subcategoryname,description,picture) values(?,?,?,?)",
[req.body.categoryid,req.body.subcategoryname,req.body.description,req.file.originalname],function(error,result){
  try{
    console.log(req.body)
    console.log(req.file)
     if(error)
     {
         res.status(500).json({result:false})
     }
     else{
         res.status(200).json({result:true})
     }
  }
  catch(e)
  {
     console.log("Error:",e)
     res.status(500).json({result:false})
  }
})
})
router.get('/displayallsubcategory',function(req,res){
  try{
    pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S ",function(error,result){
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
    res.status(500).json({data:[]})
  }
})
router.post('/displayallsubcategorybycategory',function(req,res){
  console.log(req.body)
  try{
    pool.query("select S.*,(select categoryname from categories C where C.categoryid=S.categoryid) as categoryname from subcategories S where S.categoryid=?",[req.body.categoryid],function(error,result){
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
    res.status(500).json({data:[]})
  }
})

router.post("/updatesubcategorydata",function(req,res){
  try{
    pool.query("update subcategories set categoryid=?,subcategoryname=?,description=? where subcategoryid=?",[req.body.categoryId,req.body.subcategoryName,req.body.description,req.body.subcategoryId],function(error,result){
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
    res.status(500).json({result:false})
  }
})

router.post('/subcategoryeditpicture',upload.single('picture'),function(req,res){
  pool.query("Update subcategories set picture=? where subcategoryid=?",
  [req.file.originalname,req.body.subcategoryId],function(error,result){
    try{
      console.log(req.body)
      console.log(req.file)
       if(error)
       {
           res.status(500).json({result:false})
       }
       else{
           res.status(200).json({result:true})
       }
    }
    catch(e)
    {
       console.log("Error:",e)
       res.status(500).json({result:false})
    }
  })
  })

  router.post('/deletesubcategory',function(req,res){
    try{
      pool.query("delete from subcategories where subcategoryid=?",[req.body.subcategoryid],function(error,result){
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