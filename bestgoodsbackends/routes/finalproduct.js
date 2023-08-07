var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/finalproductsubmit',upload.single('picture'),function(req,res){
    try{
      console.log(req.body)
      console.log(req.file)
     pool.query("insert into finalproduct(categoryid,subcategoryid,companyid,productid,modelid,size,colorid,description,price,stock,offerprice,picture,productstatus) values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.companyid,req.body.productid,req.body.modelid,req.body.size,req.body.colorid,req.body.description,req.body.price,req.body.stock,req.body.offerprice,req.file.originalname,req.body.productstatus],function(error,result){
         if(error)
         {
           console.log(error)
           res.status(500).json({result:false})
         }
         else
         {
           console.log("Result",result.insertId)
           res.status(200).json({result:true,finalproductid:result.insertId})
         }
     })
    }
    catch(e)
    {
        console.log("Error:",e)
        res.status(500).json({result:false})
    }
   })

   router.post('/savemorepictures',upload.any(),function(req,res){
    
      console.log(req.body)
      console.log(req.files)
      var q="insert into morepictures(finalproductid,image) values ?"
      pool.query(q,[req.files.map((item)=>[req.body.finalproductid,item.filename]),function(error,result){
        if(error)
        {
            return res.status(500).json({result:false})
        }
        else{
          return res.status(200).json({result:true})
        }
      }])
   })

   router.get('/displayallfinalproduct',function(req,res){
    try{
      pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid) as companyname,(select productname from product P where P.productid=F.productid) as productname,(select color from colors Col where Col.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproduct F",function(error,result){
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

  router.get('/displayallfinalproducttrending',function(req,res){
    try{
      pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid) as companyname,(select productname from product P where P.productid=F.productid) as productname,(select color from colors Col where Col.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproduct F where F.productstatus='Trending'",function(error,result){
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

  router.post('/displayallfinalproductbysubcategoryid',function(req,res){
    console.log(req.body)
      pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid) as companyname,(select productname from product P where P.productid=F.productid) as productname,(select color from colors Col where Col.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproduct F where F.subcategoryid=?",[req.body.subcategoryid],function(error,result){
        if(error)
        {
          console.log(error)
          res.status(500).json({data:[]})
        }
        else{
          res.status(200).json({data:result})
        }
      })
  })

  router.post('/displayfinalproductbyfinalproductid',function(req,res){
    console.log(req.body)
      pool.query("select F.*,(select categoryname from categories C where C.categoryid=F.categoryid) as categoryname,(select subcategoryname from subcategories S where S.subcategoryid=F.subcategoryid) as subcategoryname,(select companyname from company Co where Co.companyid=F.companyid) as companyname,(select productname from product P where P.productid=F.productid) as productname,(select color from colors Col where Col.colorid=F.colorid) as colorname,(select modelname from models M where M.modelid=F.modelid) as modelname from finalproduct F where F.finalproductid=?",[req.body.finalproductid],function(error,result){
        if(error)
        {
          console.log(error)
          res.status(500).json({data:[]})
        }
        else{
          res.status(200).json({data:result})
        }
      })
  })


  router.get('/displayallmorepicture',function(req,res){
    try{
      pool.query("select * from morepictures",function(error,result){
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

  router.post("/updatefinalproductdata",function(req,res){
    try{
      pool.query("update finalproduct set categoryid=?,subcategoryid=?,companyid=?,productid=?,modelid=?,size=?,colorid=?,description=?,price=?,stock=?,offerprice=? where finalproductid=?",[req.body.categoryId,req.body.subcategoryId,req.body.companyId,req.body.productId,req.body.modelId,req.body.size,req.body.colorId,req.body.description,req.body.price,req.body.stock,req.body.offerprice,req.body.finalproductId],function(error,result){
        if(error)
        {
          res.status(500).json({result:false})
        }
        else{
          console.log("Result:",result)
          res.status(200).json({result:true})
        }
      })
  
    }
    catch(e){
      res.status(500).json({result:false})
    }
  })

  router.post('/finalproducteditpicture',upload.single('picture'),function(req,res){
    pool.query("Update finalproduct set picture=? where finalproductid=?",
    [req.file.originalname,req.body.finalproductId],function(error,result){
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

    router.post('/editpicture',upload.single('image'),function(req,res){
      pool.query("Update morepictures set image=? where pictureid=?",
      [req.file.originalname,req.body.pictureId],function(error,result){
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

    router.post('/deletefinalproduct',function(req,res){
      try{
        pool.query("delete from finalproduct where finalproductid=?",[req.body.finalproductid],function(error,result){
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

      router.post('/deletepicture',function(req,res){
        try{
          pool.query("delete from morepictures where pictureid=?",[req.body.pictureid],function(error,result){
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