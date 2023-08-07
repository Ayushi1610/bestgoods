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
import SubCategory from "./SubCategory";
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
})
export default function DisplayAllSubCategories(props){
    const classes=useStyles(props);
    const [list,setList]=useState([])
    const [open, setOpen] = useState(false);
    const [categoryid,setCategoryid]=useState("")
    const [subcategoryid,setsubcategoryid]=useState("")
    const [subCategory,setSubCategory]=useState("")
    const [description,setDescription]=useState("")
    const [btnState,setBtnState]=useState(false)
    const [oldPicture,setOldPicture]=useState("")
    const [picture,setPicture]=useState({filename:"/camera.jpg",bytes:""})
    const [listCategory,setListCategory]=useState([])

    const fetchAllCategories=async()=>{
      var result=await getData('category/displayallcategory')
      setListCategory(result.data)
     }
 
     const fillCategory=()=>{
       return listCategory.map((item)=>{
         return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
       })
     }
    const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnState(true)
  }
  const handleCancel=()=>{
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    setBtnState(false)
  }
  const handleSubmit=async()=>{
    setOpen(false)
    var body={categoryId:categoryid,subcategoryName:subCategory,description:description,subcategoryId:subcategoryid}
    var result=await postData('subcategory/updatesubcategorydata',body)
    if(result)
      {
      Swal.fire({
        text: 'SubCategory Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit SubCategory',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     {fetchAllSubCategory()}

  }
  const fetchAllSubCategory=async()=>{
    var result= await getData("subcategory/displayallsubcategory")
    setList(result.data)
}
  const handleEditPicture=async()=>{
    setOpen(false)
    var formdata=new FormData()
        formdata.append('subcategoryId',subcategoryid)
        formdata.append('picture',picture.bytes)

        var result= await postDataAndImage('subcategory/subcategoryeditpicture',formdata)
    if(result)
      {
      Swal.fire({
        text: 'SubCategory Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit SubCategory',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     {fetchAllSubCategory()}

  }

    useEffect(function(){
        fetchAllSubCategory()
        fetchAllCategories()
    },[])
    const handleClickOpen = (rowData) => {
      fillCategory()
      setsubcategoryid(rowData.subcategoryid)
      setCategoryid(rowData.categoryid)
      setSubCategory(rowData.subcategoryname)
      setDescription(rowData.description)
      setOldPicture(rowData.picture)
      setPicture({filename:`${ServerURL}/images/${rowData.picture}`,bytes:""})
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange=(event)=>{
      setCategoryid(event.target.value)
    }
    const showSubcategoryForm=()=>{
      return(
        <div className={classes.root}>
            <div className={classes.subdiv}>
             <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                    <div>
                    <img src="/category.png" width="40"/>
                    </div>
                    <div style={{fontSize:18,letterSpacing:2,fontWeight:'bold',padding:5}}>
                        Edit SubCategory
                    </div>
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
                 <TextField value={subCategory} onChange={(event)=>setSubCategory(event.target.value)} fullWidth variant="outlined" label="SubCategory Name"/>
               </Grid>
               <Grid item xs={12}>
                 <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description" />
               </Grid>
               <Grid item xs={6}>
               <label htmlFor="contained-button-file">
               <input onChange={(event)=>handlePicture(event)} className={classes.inputStyle} accept="image/*" id="contained-button-file" multiple type="file" />
               <Button fullWidth variant="contained" component="span">Upload</Button>
               </label>
                </Grid>
                <Grid item xs={6}>
                <div style={{display:'flex',justifyContent:'center',alignItem:'center'}}>
                {btnState?<span>
                  <Button onClick={()=>{handleEditPicture()}}>Save</Button>
                    <Button onClick={()=>{handleCancel()}}>Cancel</Button>
                  </span>:<></>}
                <Avatar fullWidth variant="rounded"  alt="Picture" src={picture.filename} />
                </div>
                </Grid>
                <Grid item xs={6}>
                <Button onClick={()=>handleSubmit()} fullWidth variant="contained" startIcon={<Edit />}>Edit</Button>
                </Grid>
                <Grid item xs={6}>
                <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
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
          {showSubcategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
      )
    }
    const handleClick=()=>{
      //props.history.push({pathname:'/subcategories'})
      props.setComponent(<SubCategory setComponent={props.setComponent}/>)
    }

    const handleDelete=async(data)=>{
      Swal.fire({
        imageUrl: '/logo.jpg',
        title: `Do you want to delete ${data.subcategoryname}?`,
        showDenyButton: true,
        confirmButtonText: 'Delete',
        denyButtonText: `Don't Delete`,
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          result=await postData('subcategory/deletesubcategory',{subcategoryid:data.subcategoryid})
          if(result)
          {
            Swal.fire('Record Deleted Successfully....')
            fetchAllSubCategory();
          }
          else{
            Swal.fire('Fail to delete record....')
          }
        } else if (result.isDenied) {
          Swal.fire(`${data.subcategoryname} is Safe`)
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
                  <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">New Sub-Category</Button>
                </div>
                <div style={{marginLeft:140,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Sub-Categories</div>
              </div>}
          columns={[
            { title: 'Category ID',render: rowData =>(<div>{rowData.categoryid},{rowData.categoryname}</div>)  },
            { title: 'SubCategory ID', field: 'subcategoryid' },
            { title: 'SubCategory Name', field: 'subcategoryname'},
            { title: 'Description', field: 'description'},
            { title: 'Picture', field: 'picture',
            render: rowData => <Avatar alt="SubCategory" variant="rounded" src={`${ServerURL}/images/${rowData.picture}`} sx={{width: 56,height:56}}/>},
          ]}
          data={list}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit SubCategory',
              onClick: (event, rowData) => handleClickOpen(rowData)
            },
            {
                icon: 'delete',
                tooltip: 'Delete SubCategory',
                onClick: (event, rowData) => handleDelete(rowData)
              }
          ]}
        />
        </div>
        {showDialog()}
        </div>
      )
}