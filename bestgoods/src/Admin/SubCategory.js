import React, { useEffect, useState } from "react"
import {makeStyles} from '@mui/styles'
import { Grid,TextField,Button,Avatar} from "@mui/material";
import {Save,ClearAll,List} from '@mui/icons-material';
import { postData,ServerURL,getData,postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllSubCategories from "./DisplayAllSubCategories";

const useStyles=makeStyles({
root:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
},
subdiv:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:600,
    background:'#ecf0f1',
    padding:20,
    borderRadius:10,
    marginTop:20,
},
inputStyle:{
    display:'none',
},
center:{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
}
})

export default function SubCategory(props){
    const classes=useStyles(props);
    const [categoryid,setCategoryid]=useState("")
    const [subCategory,setSubCategory]=useState("")
    const [description,setDescription]=useState("")
    const [picture,setPicture]=useState({filename:"/camera.jpg",bytes:""})
    const [listCategory,setListCategory]=useState([])

    const fetchAllCategories=async()=>{
     var result=await getData('category/displayallcategory')
     setListCategory(result.data)
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

    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }
    const handleSubmit=async()=>{
        var formdata=new FormData()
        formdata.append('categoryid',categoryid)
        formdata.append('subcategoryname',subCategory)
        formdata.append('description',description)
        formdata.append('picture',picture.bytes)
        var result= await postDataAndImage('subcategory/subcategorysubmit',formdata)
        if(result)
      {
      Swal.fire({
        text: 'SubCategory Added Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to add SubCategory',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
    }
    const handleClick=()=>{
      //props.history.push({pathname:'/displayallsubcategories'})
      props.setComponent(<DisplayAllSubCategories setComponent={props.setComponent}/>)
    }
    const handleChange=(event)=>{
      setCategoryid(event.target.value)
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
                    <img src="/category.png" width="40"/>
                    </div>
                    <div style={{fontSize:18,letterSpacing:2,fontWeight:'bold',padding:5}}>
                        SubCategory Interface
                    </div>
                  </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.center}>
                   <Button onClick={()=>handleClick()} variant="contained" startIcon={<List/>}>SubCategory List</Button>
                  </div>
                  </Grid>
                  </Grid>
                </Grid>
               <Grid item xs={4}>
               <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryid}
          label="Category Id"
          onChange={(event)=>handleChange(event)}
        >
          {fillCategory()}
        </Select>
      </FormControl>
               </Grid>
               <Grid item xs={8}>
                 <TextField onChange={(event)=>setSubCategory(event.target.value)} fullWidth variant="outlined" label="SubCategory Name"/>
               </Grid>
               <Grid item xs={12}>
                 <TextField onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
               </Grid>
               <Grid item xs={6}>
               <label htmlFor="contained-button-file">
               <input onChange={(event)=>handlePicture(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file" />
               <Button fullWidth variant="contained" component="span">Upload</Button>
               </label>
                </Grid>
                <Grid item xs={6}>
                <div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                <Avatar fullWidth variant="rounded"  alt="Picture" src={picture.filename} />
                </div>
                </Grid>
                <Grid item xs={6}>
                <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Save />}>Save</Button>
                </Grid>
                <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
                </Grid>

             </Grid>
            </div>

        </div>
    )
}