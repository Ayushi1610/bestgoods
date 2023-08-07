import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {Save,ClearAll,List} from "@mui/icons-material"
import { useState,useEffect } from "react";
import Swal from "sweetalert2"
import { getData,postDataAndImage,postData } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllColors from "./DisplayAllColors";


const useStyles = makeStyles({
    root:{
        display:'flex',
        justifyContent:'center',
        alignItem:'center',
    },
    subdiv:{
        display:'flex',
        justifyContent:'center',
        alignItem:'center',
        width:600,
        marginTop:20,
        padding:20,
        background:'#ecf0f1',
        borderRadius:5,
    },
    inputstyle:{
      display:'none',
    },
    center:{
      display:'flex',
      justifyContent:'center',
      alignItems:'center',
    }
  });

  export default function Colors(props)
{
    const classes = useStyles(props);
    const [categoryid,setCategoryId]=useState("")
    const [subcategoryid,setSubCategoryId]=useState("")
    const [companyid,setCompanyId]=useState("")
    const [productid,setProductId]=useState("")
    const [color,setColor]=useState("")
    const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
    const [listCategory,setListCategory]=useState([])
    const [listSubCategory,setListSubCategory]=useState([])
    const [listCompany,setListCompany]=useState([])
    const [listProduct,setListProduct]=useState([])

    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }

      const handleSubmit=async()=>{
        var formData=new FormData()
        formData.append('categoryid',categoryid)
        formData.append('subcategoryid',subcategoryid)
        formData.append('companyid',companyid)
        formData.append('productid',productid)
        formData.append('color',color)
        formData.append('picture',picture.bytes)
        var result= await postDataAndImage('color/colorsubmit',formData,{headers:{"content-type":'multipart/formData'}})
        if(result)
        {
        Swal.fire({
          text: 'Color Added Successfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success'
        })
       }
       else{
        Swal.fire({
          text: 'Fail to add color',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error'
        })
       }
      }

      const fetchAllCategories=async()=>{
        var result=await getData('category/displayallcategory')
        setListCategory(result.data)
       }
       const fetchAllSubCategories=async(cid)=>{
        var body={categoryid:cid}
       var result=await postData('subcategory/displayallsubcategorybycategory',body)
       setListSubCategory(result.data)
      }
  
   
       useEffect(function()
       {
         fetchAllCategories()
       },[])
      const fillCategory=()=>{
        return listCategory.map((item)=>{
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
      }
      const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategories(event.target.value)
      }

      const fetchAllCompanies=async(pid)=>{
        var body={productid:pid}
        var result=await postData('product/displayallcompanybyproduct',body)
        setListCompany(result.data)
       }
       const fetchAllProducts=async(sid)=>{
         var body={subcategoryid:sid}
        var result=await postData('product/displayallproductbysubcategory',body)
        setListProduct(result.data)
       }


       const fillCompany=()=>{
        return listCompany.map((item)=>{
          return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
        })
      }
      const handleCompanyChange=(event)=>{
        setCompanyId(event.target.value)
      }

      const handleProductChange=(event)=>{
        setProductId(event.target.value)
        fetchAllCompanies(event.target.value)
      }

      

      const fillSubCategory=()=>{
        return listSubCategory.map((item)=>{
          return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
      }

      const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
        fetchAllProducts(event.target.value)
      }

      const fillProduct=()=>{
        return listProduct.map((item)=>{
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
      }

      const handleClick=()=>{
        //props.history.push({pathname:'/displayallcolors'})
        props.setComponent(<DisplayAllColors setComponent={props.setComponent}/>)
      }
    
return(
    <div className={classes.root}>
       <div className={classes.subdiv}>
         <Grid container spacing={2}>
         <Grid item xs={12}>
           <Grid container spacing={1}>
             <Grid item xs={6}>
           <div style={{display:'flex',flexDirection:'row'}}>
             <div>
             <img src="category.png" width='35' height='35'/>
             </div>
             <div style={{fontSize:18,letterSpacing:2,fontWeight:800,padding:5}}>
               Color
             </div>
             </div>
             </Grid>
             <Grid item xs={6} className={classes.center}>
             <div>
               <Button onClick={()=>handleClick()} variant="contained" startIcon={<List/>}>Color List</Button>
              </div>
              </Grid>
           </Grid>
          </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryid}
          label="Category Id"
          onChange={(event)=>handleCategoryChange(event)}
        >
          {fillCategory()}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sub-Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subcategoryid}
          label="Sub-Category Id"
          onChange={(event)=>handleSubCategoryChange(event)}
        >
          {fillSubCategory()}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productid}
          label="Product Id"
          onChange={(event)=>handleProductChange(event)}
        >
          {fillProduct()}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={6}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Company Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={companyid}
          label="Company Id"
          onChange={(event)=>handleCompanyChange(event)}
        >
          {fillCompany()}
        </Select>
      </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField onChange={(event)=>setColor(event.target.value)} fullWidth variant="outlined" label="Color"/>
            </Grid>
            <Grid item xs={6}>
            <label htmlFor="contained-button-file">
                <input onChange={(event)=>handlePicture(event)} className={classes.inputstyle} accept="image/*" id="contained-button-file" multiple type="file" />
                <Button fullWidth variant="contained" component="span">
                  Upload
                </Button>
            </label>
            </Grid>
            <Grid item xs={6} className={classes.center}>
            <Avatar alt="Picture" variant="rounded" src={picture.filename} />
            </Grid>
            <Grid item xs={6}>
              <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Save/>}>Save</Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant="contained" startIcon={<ClearAll/>}>Reset</Button>
            </Grid>
         </Grid>
       </div>
    </div>
)
}
