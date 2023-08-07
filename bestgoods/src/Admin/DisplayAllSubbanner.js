import MaterialTable from "material-table";
import { makeStyles } from "@mui/styles";
import { useEffect,useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Grid,TextField,Button,Avatar } from "@mui/material";
import {Save,ClearAll,List,Edit,Add, AddBox} from "@mui/icons-material"
import { getData,postData,postDataAndImage,ServerURL } from "../FetchNodeServices";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {DropzoneDialog} from 'material-ui-dropzone'
import Swal from "sweetalert2"
import Banners from "./Banner"

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
export default function DisplayAllSubbanner(props){
  const classes = useStyles(props);
  const [list,setList]=useState([])
  const [open, setOpen] =useState(false);
  const [subbannerId,setSubBannerId]=useState("")
  const [categoryId, setCategoryId] = useState("")
  const [subcategoryId, setSubCategoryId] = useState("")
  const [dropVisible,setDropVisible]=useState(false)
  const [listCategory, setListCategory] = useState([])
  const [listSubCategory, setListSubCategory] = useState([])
  const [btnState, setBtnState] =useState(false);
  const [oldPicture,setOldPicture]=useState(" ")
  const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
  const handlePicture=(event)=>{
    setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnState(true)
  }

  const handleAddPicture=()=>{
    setDropVisible(true)
}

  const fetchAllCategories = async () => {
    var result = await getData('category/displayallcategory')
    setListCategory(result.data)
}
const fetchAllSubCategories = async (cid) => {
    var body = { categoryid: cid }
    var result = await postData('subcategory/displayallsubcategorybycategory', body)
    setListSubCategory(result.data)
}

useEffect(function () {
    fetchAllCategories()
}, [])
const fillCategory = () => {
    return listCategory.map((item) => {
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
}
const handleChangeCategories=(event)=>{
  setCategoryId(event.target.value)
  fetchAllSubCategories(event.target.value)
}

const fillSubCategory = () => {
    return listSubCategory.map((item) => {
        return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
}

const handleChangeSubCategories=(event)=>{
  setSubCategoryId(event.target.value)
}

const fetchAllSubBanner=async()=>{
    var result=await getData("subbanner/displayallsubbanner")
    setList(result.data)
   }


  const handleDelete=async(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete }?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('banner/deletebanner',{bannerId:data.bannerid})
        if(result)
        {
          Swal.fire('Record Deleted Successfully....')
          fetchAllSubBanner();
        }
        else{
          Swal.fire('Fail to delete record....')
        }
      } else if (result.isDenied) {
        Swal.fire(`Banner is Safe`)
      }
    })
  }

  const handleEditPicture=async()=>{
   setOpen(false)
    var formData=new FormData()
      formData.append('subbannerId',subbannerId)
      formData.append('images',picture.bytes)
      var result= await postDataAndImage('subbanner/subbannereditimage',formData,{headers:{"content-type":'multipart/formData'}})
      alert(JSON.stringify(result))
    if(result)
      {
      Swal.fire({
        text: 'Sub-Banner Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit Sub-Banner',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     {fetchAllSubBanner()}
  }

  const handleSubBannersList=()=>{
    // props.history.push({pathname:"/displayallsubbanners"})
    //props.setComponent(<DisplayAllSubBanners setComponent={props.setComponent}/>)
}

const handleSubmit=async()=>{
  setOpen(false)
  var body={categoryId:categoryId,subcategoryId:subcategoryId,subbannerId:subbannerId}
  var result=await postData('subbanner/updatesubbannerdata',body)
  if(result)
    {
    Swal.fire({
      text: 'Subbanner Edited Successfully',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'success'
    })
   }
   else{
    Swal.fire({
      text: 'Fail to edit Subbanner Data',
      imageUrl: '/logo.jpg',
      imageAlt: 'Custom image',
      icon:'error'
    })
   }
   {fetchAllSubBanner()}

}

  
  const handleClickOpen = (rowData) => {
    fetchAllSubCategories(rowData.categoryid)
    setSubBannerId(rowData.bannerid)
    setCategoryId(rowData.categoryid)
    setSubBannerId(rowData.subcategoryid)
    setOldPicture(rowData.images)
    setPicture({filename:`${ServerURL}/images/${rowData.images}`,bytes:""})
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
          {showSubBannerForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
  const showSubBannerForm=()=>{
    return(
      <div className={classes.root}>
      <div className={classes.subdiv}>
          <Grid container spacing={2}>
              <Grid item xs={6} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
              <div>
                  <img src="category.png" width='25'></img>
                  </div>
                  <div style={{fontSize:16, letterSpacing:1, fontWeight:800}}>
                      &nbsp; Sub Banner Interface
                  </div>
              </Grid>
                  
              <Grid item xs={6} className={classes.center} style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <div>
                      <Button onClick={()=>handleSubBannersList()} startIcon={<List />} variant="contained">SubBanner List</Button>
                  </div>
              </Grid>

              <Grid item xs={6} className={classes.center}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Category ID</InputLabel>
                      <Select 
                      labelId="demo-simple-select-label" 
                      id="demo-simple-select" 
                      value={categoryId} 
                      label="Category Id"
                      onChange={(event=>handleChangeCategories(event))} >
                          {fillCategory()}
                      </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={6} className={classes.center}>
                  <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Subcategory ID</InputLabel>
                      <Select 
                      labelId="demo-simple-select-label" 
                      id="demo-simple-select" 
                      value={subcategoryId} 
                      label="SubCategory Id"
                      onChange={(event=>handleChangeSubCategories(event))} >
                          {fillSubCategory()}
                      </Select>
                  </FormControl>
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
                  <Button fullWidth onClick={()=>handleSubmit()} variant="contained" startIcon={<Edit />}>Edit</Button>
              </Grid>
              <Grid item xs={6}>
                  <Button fullWidth variant="contained" startIcon={<ClearAll />}>Reset</Button>
              </Grid>
          </Grid>
      </div>
  </div>
  )
  }
  useEffect(function(){
   fetchAllSubBanner()
  },[])
  const handleClick=()=>{
    //props.history.push({pathname:'/categories'})
    props.setComponent(<Banners setComponent={props.setComponent}/>)
  }
    return (
      <div className={classes.root}>
        <div className={classes.subdivtable}>
        <MaterialTable
          title={
            
          <div style={{display:'flex',flexDirection:'row',width:4500,alignItems:'flex-start'}}>
            <div style={{padding:5}}>
                <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">New Sub-Banner</Button>
              </div>
              <div style={{marginLeft:140,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Categories</div>
            </div>}
          columns={[
            { title: 'Sub-Banner Id', field: 'subbannerid' },
            { title: 'Category Id',render: rowData =>(<div>{rowData.categoryid},{rowData.categoryname}</div>)  },
            { title: 'SubCategory Id',render: rowData =>(<div>{rowData.subcategoryid},{rowData.subcategoryname}</div>)  },
            { title: 'Image', field: 'images',
          render: rowData => <Avatar variant="rounded" alt="Category" src={`${ServerURL}/images/${rowData.images}`} sx={{width: 56, height:56}}/>},
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