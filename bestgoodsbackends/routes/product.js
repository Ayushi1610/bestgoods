var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/productsubmit',upload.single('icon'),function(req,res){
    try{
      console.log(req.body)
      console.log(req.file)
     pool.query("insert into product(categoryid,subcategoryid,companyid,productname,description,status,icon) values(?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productname,req.body.description,req.body.status,req.file.originalname],function(error,result){
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

   router.get('/displayallproduct',function(req,res){
    try{
      pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from product P",function(error,result){
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

  router.post('/displayallproductbysubcategory',function(req,res){
    console.log(req.body)
    try{
      pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from product P where P.subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error)
        {
          console.log(error)
          res.status(500).json({data:[]})
        }
        else{
          console.log(result)
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

  router.post('/displayallcompanybyproduct',function(req,res){
    console.log(req.body)
    try{
      pool.query("select P.*,(select categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=P.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=P.companyid) as companyname from product P where P.productid=?",[req.body.productid],function(error,result){
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


  router.post("/updateproductdata",function(req,res){
    try{
      pool.query("update product set categoryid=?,subcategoryid=?,companyid=?,productname=?,description=?,status=? where productid=?",[req.body.categoryId,req.body.subcategoryId,req.body.companyId,req.body.productName,req.body.description,req.body.status,req.body.productId],function(error,result){
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

  router.post('/producteditpicture',upload.single('icon'),function(req,res){
    pool.query("Update product set icon=? where productid=?",
    [req.file.originalname,req.body.productId],function(error,result){
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

    router.post('/deleteproduct',function(req,res){
      try{
        pool.query("delete from product where productid=?",[req.body.productid],function(error,result){
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