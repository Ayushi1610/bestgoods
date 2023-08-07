import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {Save,ClearAll,List} from "@mui/icons-material"
import { useState } from "react";
import { postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2"
import DisplayAllCategories from "./DisplayAllCategories";
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

export default function Categories(props)
{
    const classes = useStyles(props);
    const [category,setCategory]=useState("")
    const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
    const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleSubmit=async()=>{
      var formData=new FormData()
      formData.append('categoryname',category)
      formData.append('icon',picture.bytes)
      var result= await postDataAndImage('category/categorysubmit',formData,{headers:{"content-type":'multipart/formData'}})
      if(result)
      {
      Swal.fire({
        text: 'Category Added Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to add category',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
    }
    const handleClick=()=>{
      //props.history.push({pathname:'/displayallcategories'})
      props.setComponent(<DisplayAllCategories setComponent={props.setComponent}/>)
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
                   Category Interface
                 </div>
                 </div>
                 </Grid>
                 <Grid item xs={6} className={classes.center}>
                 <div>
                   <Button onClick={()=>handleClick()} variant="contained" startIcon={<List/>}>Category List</Button>
                  </div>
                  </Grid>
               </Grid>
              </Grid>
                <Grid item xs={12}>
                  <TextField onChange={(event)=>setCategory(event.target.value)} fullWidth variant="outlined" label="Category Name"/>
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