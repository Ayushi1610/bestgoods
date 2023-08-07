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
import Colors from "./Color"

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

  export default function DisplayAllColors(props){
    const classes = useStyles(props);
    const [list,setList]=useState([]);
    const [open, setOpen] = useState(false);
    const [colorid,setColorId]=useState("");
    const [categoryid,setCategoryId]=useState("");
    const [subcategoryid,setSubCategoryId]=useState("");
    const [companyid,setCompanyId]=useState("");
    const [productid,setProductId]=useState("")
    const [btnState,setBtnState]=useState(false);
    const [oldPicture,setOldPicture]=useState("")
    const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
    const [listCategory,setListCategory]=useState([])
    const [listCompany,setListCompany]=useState([])
    const [listSubCategory,setListSubCategory]=useState([])
    const [color,setColor]=useState("")
    const [listProduct,setListProduct]=useState([])

    const handleClickOpen = (rowData) => {
      fetchAllSubCategories(rowData.categoryid)
      fetchAllProducts(rowData.subcategoryid)
      fetchAllCompanies(rowData.productid)
        setColorId(rowData.colorid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setCompanyId(rowData.companyid)
        setProductId(rowData.productid)
        setColor(rowData.color)
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
       const fetchAllColor=async()=>{
        var result= await getData('color/displayallcolor')
        setList(result.data)
    }

   
   
    const fillCategory=()=>{
      return listCategory.map((item)=>{
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })
    }
       useEffect(function(){
        fetchAllCategories()
        fetchAllColor()
    },[])
    const handleCategoryChange=(event)=>{
      setCategoryId(event.target.value)
      fetchAllSubCategories(event.target.value)
    }
    const fetchAllCompanies=async(pid)=>{
      var body={productid:pid}
      var result=await postData('product/displayallcompanybyproduct',body)
      setListCompany(result.data)
     }
   
     const fillCompany=()=>{
      return listCompany.map((item)=>{
        return <MenuItem value={item.companyid}>{item.companyname}</MenuItem>
      })
    }
    const handleCompanyChange=(event)=>{
      setCompanyId(event.target.value)
    }
      const handleSubmit=async()=>{
        setOpen(false)
        var body={categoryId:categoryid,subcategoryId:subcategoryid,companyId:companyid,productId:productid,color:color,colorId:colorid}
        var result=await postData('color/updatecolordata',body)
        if(result)
          {
          Swal.fire({
            text: 'Color Edited Successfully',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'success'
          })
         }
         else{
          Swal.fire({
            text: 'Fail to edit color',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'error'
          })
         }
         {fetchAllColor()}
    
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
            formdata.append('colorId',colorid)
            formdata.append('picture',picture.bytes)
    
            var result= await postDataAndImage('color/coloreditpicture',formdata)
        if(result)
          {
          Swal.fire({
            text: 'Color Edited Successfully',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'success'
          })
         }
         else{
          Swal.fire({
            text: 'Fail to edit color',
            imageUrl: '/logo.jpg',
            imageAlt: 'Custom image',
            icon:'error'
          })
         }
         {fetchAllColor()}
    
      }
      
      const fetchAllProducts=async(sid)=>{
        var body={subcategoryid:sid}
       var result=await postData('product/displayallproductbysubcategory',body)
       setListProduct(result.data)
      //  alert(JSON.stringify(subcategoryid))
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


    const handleProductChange=(event)=>{
      setProductId(event.target.value)
      fetchAllCompanies(event.target.value)
    }


      const fillProduct=()=>{
        return listProduct.map((item)=>{
          return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
      }

    

      const showColorForm=()=>{
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
               <Button onClick={()=>fetchAllColor()} variant="contained" startIcon={<List/>}>Color List</Button>
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
              <TextField value={color} onChange={(event)=>setColor(event.target.value)} fullWidth variant="outlined" label="Color"/>
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
            {showColorForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
        )
      }
    
      const handleClick=()=>{
        //props.history.push({pathname:'/colors'})
        props.setComponent(<Colors setComponent={props.setComponent}/>)
      }

      const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
          title: `Do you want to delete ${data.color}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            result=await postData('color/deletecolor',{colorid:data.colorid})
            if(result)
            {
              Swal.fire('Record Deleted Successfully....')
              fetchAllColor();
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
                  <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">New Color</Button>
                </div>
                <div style={{marginLeft:300,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Colors</div>
              </div>}
          columns={[
            {title:'Color Id',field:'colorid'},
            { title: 'Category Id',render: rowData =>(<div>{rowData.categoryid},{rowData.categoryname}</div>)  },
            { title: 'SubCategory Id',render: rowData =>(<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>)  },
            { title: 'Product Id',render: rowData =>(<div>{rowData.productid},{rowData.productname}</div>) },
            { title: 'Company Id',render: rowData =>(<div>{rowData.companyid},{rowData.companyname}</div>)  },
            { title: 'Color', field: 'color'},
            { title: 'Picture', field: 'picture',
            render: rowData => <Avatar alt="Product" variant="rounded" src={`${ServerURL}/images/${rowData.picture}`} sx={{width: 56,height:56}}/>},
          ]}
          data={list}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Color',
              onClick: (event, rowData) => handleClickOpen(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Delete Color',
                onClick: (event, rowData) => handleDelete(rowData)
              }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
  }