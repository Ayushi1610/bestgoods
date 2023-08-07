var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/colorsubmit',upload.single('picture'),function(req,res){
    try{
      console.log(req.body)
      console.log(req.file)
     pool.query("insert into colors(categoryid,subcategoryid,companyid,productid,color,picture) values(?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.color,req.file.originalname],function(error,result){
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

   router.get('/displayallcolor',function(req,res){
    try{
      pool.query("select Col.*,(select categoryname from categories C where C.categoryid=Col.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=Col.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=Col.companyid) as companyname ,(select productname from product P where P.productid=Col.productid) as productname from colors Col",function(error,result){
        if(error)
        {
          console.log(error)
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

  router.post('/displayallcolorbycompany',function(req,res){
    console.log(req.body)
    try{
      pool.query("select Col.*,(select categoryname from categories C where C.categoryid=Col.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=Col.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=Col.companyid) as companyname ,(select productname from product P where P.productid=Col.productid) as productname from colors Col where Col.companyid=?",[req.body.companyid],function(error,result){
        if(error)
        {
          console.log(error)
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

  router.post("/updatecolordata",function(req,res){
    try{
      pool.query("update colors set categoryid=?,subcategoryid=?,companyid=?,productid=?,color=? where colorid=?",[req.body.categoryId,req.body.subcategoryId,req.body.companyId,req.body.productId,req.body.color,req.body.colorId],function(error,result){
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

  router.post('/coloreditpicture',upload.single('picture'),function(req,res){
    pool.query("Update colors set picture=? where colorid=?",
    [req.file.originalname,req.body.colorId],function(error,result){
      try{
        console.log(req.body)
        console.log(req.file)
         if(error)
         {
           console.log(error)
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

    router.post('/deletecolor',function(req,res){
      try{
        pool.query("delete from colors where colorid=?",[req.body.colorid],function(error,result){
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