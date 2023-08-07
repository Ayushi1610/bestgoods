import MaterialTable from "material-table";
import { makeStyles } from "@mui/styles";
import { useEffect,useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid,TextField,Button,Avatar} from "@mui/material";
import {Save,ClearAll,List,Edit,AddBox} from '@mui/icons-material';
import {getData, postData,ServerURL,postDataAndImage } from "../FetchNodeServices";
import Swal from "sweetalert2";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FinalProduct from "./FinalProduct";

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
    inputstyle:{
        display:'none'
    },
    center:{
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
    },
    subdivtable:{
      //display:'flex',
      justifyContent:'center',
      alignItem:'center',
      width:1200,
      marginTop:20,
      padding:20,
      background:'#ecf0f1',
      borderRadius:5,
  },
  })

  export default function DisplayAllFinalProducts(props){
    const classes = useStyles(props);
    const [finalproductid,setFinalProductId]=useState("")
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
    const [list,setList]=useState([])
    const [btnState,setBtnState]=useState(false);
    const [open, setOpen] = useState(false);
    const [oldPicture,setOldPicture]=useState("")



    const handleClickOpen = (rowData) => {
      fetchAllSubCategories(rowData.categoryid)
      fetchAllProducts(rowData.subcategoryid)
      fetchAllCompanies(rowData.productid)
      fetchAllColors(rowData.companyid)
      fetchAllModels(rowData.companyid)
        setFinalProductId(rowData.finalproductid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setProductId(rowData.productid)
        setModelId(rowData.modelid)
        setSize(rowData.size)
        setColorId(rowData.colorid)
        setDescription(rowData.description)
        setPrice(rowData.price)
        setStock(rowData.stock)
        setOfferPrice(rowData.offerprice)
        setOldPicture(rowData.picture)
        setPicture({filename:`${ServerURL}/images/${rowData.picture}`,bytes:""})
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };
     

      const fetchAllCategories=async()=>{
        var result=await getData('category/displayallcategory')
        setListCategory(result.data)
       }
       const fetchAllSubCategories=async(cid)=>{
        var body={categoryid:cid}
       var result=await postData('subcategory/displayallsubcategorybycategory',body)
       setListSubCategory(result.data)
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
       const fetchAllFinalProducts=async()=>{
        var result=await getData('finalproduct/displayallfinalproduct')
        setList(result.data)
      }

   
   
      const fillCategory=()=>{
        return listCategory.map((item)=>{
          return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
      }
      const fillSubCategory=()=>{
        return listSubCategory.map((item)=>{
          return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
      }
      const fillCompany=()=>{
        return listCompany.map((item)=>{
          return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
        })
      }
      const fillProduct=()=>{
        return listProduct.map((item)=>{
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
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
       useEffect(function(){
        fetchAllCategories()
        fetchAllFinalProducts()
    },[])
    const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
      }
   
       
      const handleCompanyChange=(event)=>{
        setCompanyId(event.target.value)
        fetchAllColors(event.target.value)
        fetchAllModels(event.target.value)
        
      }
      const handleSubmit=async()=>{
        setOpen(false)
        var body={categoryId:categoryid,subcategoryId:subcategoryid,companyId:companyid,productId:productid,modelId:modelid,size:size,colorId:colorid,description:description,price:price,stock:stock,offerprice:offerprice,finalproductId:finalproductid}
        var result=await postData('finalproduct/updatefinalproductdata',body)
        if(result)
          {
          Swal.fire({
            text: 'Final Product Edited Successfully',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'success'
          })
         }
         else{
          Swal.fire({
            text: 'Fail to edit final product',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'error'
          })
         }
         {fetchAllFinalProducts()}
    
      }

      const handlePicture=(event)=>{
        setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnState(true)
    }
    const handleCancel=()=>{
      setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
      setBtnState(false)
    }
    
    const handleEditPicture=async()=>{
        setOpen(false)
        var formdata=new FormData()
            formdata.append('finalproductId',finalproductid)
            formdata.append('picture',picture.bytes)
    
            var result= await postDataAndImage('finalproduct/finalproducteditpicture',formdata)
        if(result)
          {
          Swal.fire({
            text: 'Final Product Edited Successfully',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'success'
          })
         }
         else{
          Swal.fire({
            text: 'Fail to edit final product',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'error'
          })
         }
         {fetchAllFinalProducts()}
    
      }
      


    const handleSubCategoryChange=(event)=>{
      setSubCategoryId(event.target.value)
    }

    const handleProductChange=(event)=>{
        setProductId(event.target.value)
      }

      const handleColorChange=(event)=>{
          setColorId(event.target.value)
      }

      const handleModelChange=(event)=>{
        setModelId(event.target.value)
    }
    const handleSize=(event)=>{
      setSize(event.target.value)
    }


      const showFinalProductForm=()=>{
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
                    <Grid item xs={4}>
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
                    <Grid item xs={4}>
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
            <Grid item xs={4}>
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
            
                    <Grid item xs={12}>
                      <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description"/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={price} onChange={(event)=>setPrice(event.target.value)} fullWidth variant="outlined" label="Price"/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={stock} onChange={(event)=>setStock(event.target.value)} fullWidth variant="outlined" label="Stock"/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={offerprice} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth variant="outlined" label="Offer Price"/>
                    </Grid>
                    <Grid item xs={6} >
            <label htmlFor="contained-button-file">
              <input onChange={(event) => handlePicture(event)} accept="image/*" className={classes.inputstyle} id="contained-button-file" multiple type="file" />
              <Button fullWidth variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Grid>
                    <Grid item xs={6} >
                    <div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                {btnState?<span>
                  <Button onClick={()=>{handleEditPicture()}}>Save</Button>
                    <Button onClick={()=>{handleCancel()}}>Cancel</Button>
                  </span>:<></>}
                <Avatar fullWidth variant="rounded"  alt="Picture" src={picture.filename} />
                </div>
                    </Grid>
                    <Grid item xs={6}>
                      <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Edit/>}>Edit</Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button fullWidth variant="contained" startIcon={<ClearAll/>}>Reset</Button>
                    </Grid>
                 </Grid>
               </div>
            </div>
        )
      }

      const showDialog=()=>{
        return(
          <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            {showFinalProductForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
        )
      }
    
      const handleClick=()=>{
        //props.history.push({pathname:'/finalproducts'})
        props.setComponent(<FinalProduct setComponent={props.setComponent}/>)
      }

      const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
          title: `Do you want to delete ?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData('finalproduct/deletefinalproduct',{finalproductid:data.finalproductid})
            if(result)
            {
              Swal.fire('Record Deleted Successfully....')
              fetchAllFinalProducts();
            }
            else{
              Swal.fire('Fail to delete record....')
            }
          } else if (result.isDenied) {
            Swal.fire(`${data.color} is Safe`)
          }
        })
      }
    return (
        <div className={classes.root}>
            <div className={classes.subdivtable}>
        <MaterialTable
          title={
            
            <div style={{display:'flex',flexDirection:'row',width:4500,alignItems:'flex-start'}}>
              <div style={{padding:5}}>
                  <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">Add New Product</Button>
                </div>
                <div style={{marginLeft:300,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Final Products</div>
              </div>}
          columns={[
            {title:'Final Product Id',field:'finalproductid'},
            { title: 'Category Id',render: rowData =>(<div>{rowData.categoryid},{rowData.categoryname}</div>)  },
            { title: 'SubCategory Id',render: rowData =>(<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>)  },
            { title: 'Company Id',render: rowData =>(<div>{rowData.companyid},{rowData.companyname}</div>)  },
            { title: 'Product Id',render: rowData =>(<div>{rowData.productid},{rowData.productname}</div>) },
            { title: 'Color Id',render: rowData =>(<div>{rowData.colorid},{rowData.colorname}</div>) },
            { title: 'Model Id',render: rowData =>(<div>{rowData.modelid},{rowData.modelname}</div>) },
            { title: 'Size',field: 'size' },
            { title: 'Description', field: 'description'},
            { title: 'Price', field: 'price'},
            { title: 'Stock', field: 'stock'},
            { title: 'Offer Price', field: 'offerprice'},
            { title: 'Picture', field: 'picture',
            render: rowData => <Avatar alt="Product" variant="rounded" src={`${ServerURL}/images/${rowData.picture}`} sx={{width: 56,height:56}}/>},
          ]}
          data={list}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Final Product',
              onClick: (event, rowData) => handleClickOpen(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Delete Final Product',
                onClick: (event, rowData) => handleDelete(rowData)
              }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
  }