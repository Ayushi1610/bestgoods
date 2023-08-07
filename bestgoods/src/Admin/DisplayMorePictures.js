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
export default function DisplayMorePictures(props){
  const classes = useStyles(props);
  const [list,setList]=useState([])
  const [open, setOpen] =useState(false);
  const [pictureId,setPictureId]=useState("")
  const [finalProductId,setFinalProductId]=useState("")
  const [oldPicture,setOldPicture]=useState()
  const [btnState, setBtnState] =useState(false);
  const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
  const handlePicture=(event)=>{
    setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setBtnState(true)
  }

  const fetchAllMorePicture=async()=>{
    var result=await getData("finalproduct/displayallmorepicture")
    setList(result.data)
   }
   useEffect(function(){
    fetchAllMorePicture()
   },[])

  const handleClickOpen = (rowData) => {
    setPictureId(rowData.pictureid)
    setFinalProductId(rowData.finalproductid)
    setOldPicture(rowData.image)
    setPicture({filename:`${ServerURL}/images/${rowData.image}`,bytes:""})
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditPicture=async()=>{
    setOpen(false)
    var formData=new FormData()
      formData.append('pictureId',pictureId)
      formData.append('image',picture.bytes)
      var result= await postDataAndImage('finalproduct/editpicture',formData,{headers:{"content-type":'multipart/formData'}})
    if(result)
      {
      Swal.fire({
        text: 'Picture Edited Successfully',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'success'
      })
     }
     else{
      Swal.fire({
        text: 'Fail to edit picture',
        imageUrl: '/logo.jpg',
        imageAlt: 'Custom image',
        icon:'error'
      })
     }
     {fetchAllMorePicture()}
  }

  const handleCancel=()=>{
    setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
    setBtnState(false)
  }

  const handleDelete=async(data)=>{
    Swal.fire({
      imageUrl: '/logo.jpg',
      title: `Do you want to delete?`,
      showDenyButton: true,
      confirmButtonText: 'Delete',
      denyButtonText: `Don't Delete`,
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        result=await postData('finalproduct/deletepicture',{pictureid:data.pictureid})
        if(result)
        {
          Swal.fire('Record Deleted Successfully....')
          fetchAllMorePicture();
        }
        else{
          Swal.fire('Fail to delete record....')
        }
      } else if (result.isDenied) {
        Swal.fire(`${data.categoryname} is Safe`)
      }
    })
  }

  const showPicture=()=>{
  return(
    <div className={classes.root}>
    <div className={classes.subdiv}>
    <Grid container spacing={2}>
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
      {showPicture()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.subdivtable}>
      <MaterialTable
        title={
          
        <div style={{display:'flex',flexDirection:'row',width:4500,alignItems:'flex-start'}}>
            <div style={{marginLeft:300,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Pictures</div>
          </div>}
        columns={[
          { title: 'Picture Id', field: 'pictureid' },
          { title: 'Final Product Id', field: 'finalproductid' },
          { title: 'Image', field: 'image',
          render: rowData => <Avatar variant="rounded" alt="Category" src={`${ServerURL}/images/${rowData.image}`} sx={{width: 56, height:56}}/>},
        ]}
        data={list}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Picture',
            onClick: (event, rowData) =>handleClickOpen(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Picture',
            onClick: (event, rowData) =>handleDelete(rowData)
          }
        ]}
      />
      </div>
      {showDialog()}
    </div>
    )
}