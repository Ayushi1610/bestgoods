var express=require('express');
var router=express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/companysubmit',upload.single('logo'),function(req,res){
 try{
   console.log(req.body)
   console.log(req.file)
  pool.query("insert into company(companyname,contactperson,mobileno,emailid,addressone,addresstwo,country,state,city,zipcode,description,logo) values(?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.companyname,req.body.contactperson,req.body.contactnumber,req.body.emailid,req.body.addressone,req.body.addresstwo,req.body.country,req.body.state,req.body.city,req.body.zipcode,req.body.description,req.file.originalname],function(error,result){
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

router.get('/displayallcompanies',function(req,res){
  try{
    pool.query("select * from company",function(error,result){
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

router.post('/updatecompanydata',function(req,res){
  try{
    pool.query("update company set companyname=?,contactperson=?,mobileno=?,emailid=?,addressone=?,addresstwo=?,country=?,state=?,city=?,zipcode=?,description=? where companyid=?",[req.body.companyName,req.body.contactPerson,req.body.contactNumber,req.body.email,req.body.addressOne,req.body.addressTwo,req.body.country,req.body.state,req.body.city,req.body.zipcode,req.body.description,req.body.companyId],function(error,result){
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
  

router.post('/companyeditpicture',upload.single('logo'),function(req,res){
  try{
    console.log(req.body)
    console.log(req.file)
   pool.query("update company set logo=? where companyid=?",[req.file.originalname,req.body.companyId],function(error,result){
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

 router.post('/deletecompany',function(req,res){
  try{
    pool.query("delete from company where companyid=?",[req.body.companyid],function(error,result){
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