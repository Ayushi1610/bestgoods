import MaterialTable from "material-table";
import { makeStyles } from "@mui/styles";
import { useEffect,useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {Save,ClearAll,List,Edit, AddBox} from "@mui/icons-material"
import { getData,postData,postDataAndImage,ServerURL } from "../FetchNodeServices";
import Swal from "sweetalert2"
import Categories from "./Category";

const useStyles = makeStyles({
  root:{
      display:'flex',
      justifyContent:'center',
      alignItem:'center',
  },
  subdivtable:{
      //display:'flex',
      justifyContent:'center',
      alignItem:'center',
      width:900,
      marginTop:20,
      padding:20,
      background:'#ecf0f1',
      borderRadius:5,
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
export default function DisplayAllCategories(props){
  const classes = useStyles(props);
  const [list,setList]=useState([])
  const [open, setOpen] =useState(false);
  const [categoryId,setCategoryId]=useState("")
  const [category,setCategory]=useState("")
  const [btnState, setBtnState] =useState(false);
  const [oldPicture,setOldPicture]=useState()
  const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
  const handlePicture=(event)=>{
    setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnState(true)
  }
  const handleSubmit=async()=>{
    setOpen(false)
    var body={categoryId:categoryId,categoryName:category}
    var result=await postData('category/updatecategorydata',body)
    if(result)
      {
      Swal.fire({
        text: 'Category Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit category',
        imageUrl: 'logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     {fetchAllCategory()}
  }

  const handleDelete=async(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete ${data.categoryname}?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('category/deletecategory',{categoryId:data.categoryid})
        if(result)
        {
          Swal.fire('Record Deleted Successfully....')
          fetchAllCategory();
        }
        else{
          Swal.fire('Fail to delete record....')
        }
      } else if (result.isDenied) {
        Swal.fire(`${data.categoryname} is Safe`)
      }
    })
  }

  const handleEditPicture=async()=>{
    setOpen(false)
    var formData=new FormData()
      formData.append('categoryId',categoryId)
      formData.append('icon',picture.bytes)
      var result= await postDataAndImage('category/categoryeditpicture',formData,{headers:{"content-type":'multipart/formData'}})
    if(result)
      {
      Swal.fire({
        text: 'Category Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit category',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     {fetchAllCategory()}
  }
  const fetchAllCategory=async()=>{
   var result=await getData("category/displayallcategory")
   setList(result.data)
  }
  const handleClickOpen = (rowData) => {
    setCategoryId(rowData.categoryid)
    setCategory(rowData.categoryname)
    setOldPicture(rowData.icon)
    setPicture({filename:`${ServerURL}/images/${rowData.icon}`,bytes:""})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel=()=>{
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    setBtnState(false)
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
          {showCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
  const showCategoryForm=()=>{
    return(
      <div className={classes.root}>
         <div className={classes.subdiv}>
           <Grid container spacing={2}>
           <Grid item xs={12}>
             <Grid container spacing={1}>
               <Grid item xs={12}>
             <div style={{display:'flex',flexDirection:'row'}}>
               <div>
               <img src="category.png" width='35' height='35'/>
               </div>
               <div style={{fontSize:18,letterSpacing:2,fontWeight:800,padding:5}}>
                 Edit Category
               </div>
               </div>
               </Grid>
             </Grid>
            </Grid>
              <Grid item xs={12}>
                <TextField value={category} onChange={(event)=>setCategory(event.target.value)} fullWidth variant="outlined" label="Category Name"/>
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
                {btnState?<span>
                  <Button onClick={()=>{handleEditPicture()}}>Save</Button>
                  <Button onClick={()=>{handleCancel()}}>Cancel</Button>
                </span>:<></>}
              <Avatar alt="Picture" variant="rounded" src={picture.filename} />
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
  useEffect(function(){
   fetchAllCategory()
  },[])
  const handleClick=()=>{
    //props.history.push({pathname:'/categories'})
    props.setComponent(<Categories setComponent={props.setComponent}/>)
  }
    return (
      <div className={classes.root}>
        <div className={classes.subdivtable}>
        <MaterialTable
          title={
            
          <div style={{display:'flex',flexDirection:'row',width:4500,alignItems:'flex-start'}}>
            <div style={{padding:5}}>
                <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">New Category</Button>
              </div>
              <div style={{marginLeft:140,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Categories</div>
            </div>}
          columns={[
            { title: 'Category Id', field: 'categoryid' },
            { title: 'Category Name', field: 'categoryname' },
            { title: 'Icon', field: 'icon',
            render: rowData => <Avatar variant="rounded" alt="Category" src={`${ServerURL}/images/${rowData.icon}`} sx={{width: 56, height:56}}/>},
          ]}
          data={list}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Category',
              onClick: (event, rowData) =>handleClickOpen(rowData)
            },
            {
              icon: 'delete',
              tooltip: 'Delete Category',
              onClick: (event, rowData) =>handleDelete(rowData)
            }
          ]}
        />
        </div>
        {showDialog()}
      </div>
      )
}