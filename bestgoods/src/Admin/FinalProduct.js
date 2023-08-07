import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {Save,ClearAll,List,Add} from "@mui/icons-material"
import { useState,useEffect } from "react";
import Swal from "sweetalert2"
import { getData,postDataAndImage,postData, postDataAndImageWithId } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DisplayAllFinalProducts from "./DisplayAllFinalProduct"
import {DropzoneDialog} from 'material-ui-dropzone'


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
        width:900,
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

  export default function FinalProduct(props)
{
    const classes = useStyles(props);
    const [categoryid,setCategoryId]=useState("")
    const [subcategoryid,setSubCategoryId]=useState("")
    const [companyid,setCompanyId]=useState("")
    const [productid,setProductId]=useState("")
    const [colorid,setColorId]=useState("")
    const [modelid,setModelId]=useState("")
    const [size,setSize]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [stock,setStock]=useState("")
    const [offerprice,setOfferPrice]=useState("")
    const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
    const [listCategory,setListCategory]=useState([])
    const [listSubCategory,setListSubCategory]=useState([])
    const [listCompany,setListCompany]=useState([])
    const [listProduct,setListProduct]=useState([])
    const [listColor,setListColor]=useState([])
    const [listModel,setListModel]=useState([])
    const [dropVisible,setDropVisible]=useState(false)
    const [finalProductId,setFinalProductId]=useState([])
    const [productStatus,setProductStatus]=useState("")

    const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      }

      const handleSubmit = async () => {
        var formData = new FormData()
        formData.append('categoryid', categoryid);
        formData.append('subcategoryid', subcategoryid);
        
        formData.append('picture', picture.bytes);
        formData.append('productstatus',productStatus);

        var result = await postDataAndImageWithId('finalproduct/finalproductsubmit', formData, { headers: { "content-type": "multipart/formData" } })
        console.log(result.result)
        if(result.result){
          setFinalProductId(result.finalproductid);
            Swal.fire({
                text: 'Final Products Added Successfully',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'success'
            })
        }
        else {
            Swal.fire({
                title: 'Final Products Interface',
                text: 'Failed to add Final Products',
                imageUrl: '/logo.jpg',
                imageAlt: 'Custom image',
                icon: 'error'
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
        fetchAllColors(event.target.value)
        fetchAllModels(event.target.value)
        
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

      
       const fetchAllColors=async(cid)=>{
         var body={companyid:cid}
         var result=await postData('color/displayallcolorbycompany',body)
         setListColor(result.data)
       }
       const fetchAllModels=async(cid)=>{
        var body={companyid:cid}
         var result=await postData('model/displayallmodelbycompany',body)
         setListModel(result.data)
       }

      const handleColorChange=(event)=>{
        setColorId(event.target.value)
      }

      const handleModelChange=(event)=>{
        setModelId(event.target.value)
      }

      const handleClick=()=>{
        //props.history.push({pathname:'/displayallfinalproducts'})
        props.setComponent(<DisplayAllFinalProducts setComponent={props.setComponent}/>)
      }

      const handleSize=(event)=>{
        setSize(event.target.value)
      }

      const fillColor=()=>{
        return listColor.map((item)=>{
          return <MenuItem value={item.colorid}>{item.color}</MenuItem>
        })
      }
      const fillSize=()=>{
        return listModel.map((item)=>{
          return <MenuItem value={item.size}>{item.size}</MenuItem>
        })
      }

      const fillModel=()=>{
        return listModel.map((item)=>{
          return <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
        })
      }

      const handleAddPicture=()=>{
           setDropVisible(true)
      }
      const handleSave=async(files)=>{
       var formData= new FormData()
      formData.append('categoryid', categoryid);
      formData.append('subcategoryid', subcategoryid);
       files.map((file,index)=>{
         formData.append("image"+index,file)
       })
       var result=await postDataAndImage('finalproduct/savemorepictures',formData)
       alert(result)
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
               Final Products
             </div>
             </div>
             </Grid>
             <Grid item xs={6} className={classes.center}>
             <div>
               <Button onClick={()=>handleClick()} variant="contained" startIcon={<List/>}>Final Products List</Button>
              </div>
              </Grid>
           </Grid>
          </Grid>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
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
            <Grid item xs={3}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Color Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={colorid}
          label="Color Id"
          onChange={(event)=>handleColorChange(event)}
        >
         {fillColor()}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Model Id</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={modelid}
          label="Model Id"
          onChange={(event)=>handleModelChange(event)}
        >
          {fillModel()}
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Size</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={size}
          label="Size"
          onChange={(event)=>handleSize(event)}
        >
          {fillSize()}
        </Select>
      </FormControl>
            </Grid>
            
            <Grid item xs={3}>
              <TextField onChange={(event)=>setPrice(event.target.value)} fullWidth variant="outlined" label="Price"/>
            </Grid>
            <Grid item xs={4}>
              <TextField onChange={(event)=>setStock(event.target.value)} fullWidth variant="outlined" label="Stock"/>
            </Grid>
            <Grid item xs={4}>
              <TextField onChange={(event)=>setOfferPrice(event.target.value)} fullWidth variant="outlined" label="Offer Price"/>
            </Grid>
            <Grid item xs={4}>
            <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label2">Product Status</InputLabel>
        <Select
          labelId="demo-simple-select-label2"
          id="demo-simple-select2"
          value={productStatus}
          label="Product Status"
          onChange={(event)=>setProductStatus(event.target.value)}
        >
          <MenuItem value="Trending">Trending</MenuItem>
          <MenuItem value="New Arrival">New Arrival</MenuItem>
        </Select>
      </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description"/>
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
            <Grid item xs={4}>
              <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Save/>}>Save</Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" startIcon={<ClearAll/>}>Reset</Button>
            </Grid>
            <Grid item xs={4}>
              <Button fullWidth variant="contained" onClick={()=>handleAddPicture()} startIcon={<Add/>}>Add more pictures</Button>
            </Grid>
         </Grid>

         <DropzoneDialog
                    open={dropVisible}
                    onSave={(files)=>handleSave(files)}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={true}
                    maxFileSize={5000000}
                    onClose={()=>setDropVisible(false)}
                    filesLimit={10}
                />
       </div>
    </div>
)
}
