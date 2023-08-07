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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Country, State, City }  from 'country-state-city';
import Companies from "./Company"


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
        width:1200,
        marginTop:20,
        padding:20,
        background:'#ecf0f1',
        borderRadius:5,
    },
    subdiv:{
      display:'flex',
      justifyContent:'center',
      alignItem:'center',
      width:1300,
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

  export default function DisplayAllCompanies(props){
    const classes = useStyles(props);
    const [list,setList]=useState([])
    const [open, setOpen] =useState(false);
    const [companyId,setCompanyId]=useState("")
    const [company,setCompany]=useState("")
    const [contactPerson,setContactPerson]=useState("")
    const [contactNumber,setContactNumber]=useState("")
    const [email,setEmail]=useState("")
    const [addressOne,setAddressOne]=useState("")
    const [addressTwo,setAddressTwo]=useState("")
    const [country,setCountry]=useState("")
    const [state,setState]=useState("")
    const [city,setCity]=useState("")
    const [zipcode,setZipcode]=useState("")
    const [description,setDescription]=useState("")
    const [btnState, setBtnState] =useState(false);
    const [oldPicture,setOldPicture]=useState()
    const [picture,setPicture]=useState({filename:"camera.jpg",bytes:""})
    const handlePicture=(event)=>{
      setPicture({filename:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setBtnState(true)
    }
    const handleEditPicture=async()=>{
      setOpen(false)
      var formData=new FormData()
        formData.append('companyId',companyId)
        formData.append('logo',picture.bytes)
        var result= await postDataAndImage('company/companyeditpicture',formData,{headers:{"content-type":'multipart/formData'}})
      if(result)
        {
        Swal.fire({
          text: 'Company Edited Successfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success'
        })
       }
       else{
        Swal.fire({
          text: 'Fail to edit company',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'error'
        })
       }
       {fetchAllCompany()}
    }
    const handleCancel=()=>{
      setPicture({filename:`${ServerURL}/images/${oldPicture}`,bytes:""})
      setBtnState(false)
    }

    const handleSubmit=async()=>{
      setOpen(false)
      var body={companyId:companyId,companyName:company,contactPerson:contactPerson,contactNumber:contactNumber,email:email,addressOne:addressOne,addressTwo:addressTwo,country:country,state:state,city:city,zipcode:zipcode,description:description}
      var result=await postData('company/updatecompanydata',body)
      if(result)
        {
        Swal.fire({
          text: 'Company Edited Successfully',
          imageUrl: '/logo.jpg',
          imageAlt: 'Custom image',
          icon:'success'
        })
       }
       else{
        Swal.fire({
          text: 'Fail to edit company',
          imageUrl: 'logo.jpg',
          imageAlt: 'Custom image',
          icon:'error'
        })
       }
       {fetchAllCompany()}
    }
    const fillCountry=()=>{
      return Country.getAllCountries().map((item)=>{
        return <MenuItem value={item.isoCode}>{item.name}</MenuItem>
      })
    }
    const handleCountry=(event)=>{
      setCountry(event.target.value)
      fillState()
    }

    const handleState=(event)=>{
      setState(event.target.value)
      fillCity()
    }


    const fillState=()=>{
      return State.getStatesOfCountry(country).map((item)=>{
        return <MenuItem value={item.isoCode}>{item.name}</MenuItem>
      })
    }

    const fillCity=()=>{
      return City.getCitiesOfState(country,state).map((item)=>{
        return <MenuItem value={item.name}>{item.name}</MenuItem>
      })
    }
    
    

    const showCompanyForm=()=>{
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
                       Company Interface
                     </div>
                     </div>
                     </Grid>
                   </Grid>
                  </Grid>
                    <Grid item xs={12}>
                      <TextField value={company} onChange={(event)=>setCompany(event.target.value)} fullWidth variant="outlined" label="Company Name"/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={contactPerson} onChange={(event)=>setContactPerson(event.target.value)} fullWidth variant="outlined" label="Contact Person"/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={contactNumber} onChange={(event)=>setContactNumber(event.target.value)} fullWidth variant="outlined" label="Contact Number"/>
                    </Grid>
                    <Grid item xs={4}>
                      <TextField value={email} onChange={(event)=>setEmail(event.target.value)} fullWidth variant="outlined" label="Company Email Id"/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField value={addressOne} onChange={(event)=>setAddressOne(event.target.value)} fullWidth variant="outlined" label="Address One"/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField value={addressTwo} onChange={(event)=>setAddressTwo(event.target.value)} fullWidth variant="outlined" label="Address Two"/>
                    </Grid>
                    <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={country}
          label="Country"
          onChange={(event)=>handleCountry(event)}
        >
          {fillCountry()}
        </Select>
      </FormControl>
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={state}
          label="State"
          onChange={(event)=>handleState(event)}
        >
          {fillState()}
        </Select>
      </FormControl>
  
                </Grid>
                <Grid item xs={6}>
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">City</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={city}
          label="City"
          onChange={(event)=>setCity(event.target.value)}
        >
          {fillCity()}
        </Select>
      </FormControl>
                </Grid>
                    <Grid item xs={6}>
                      <TextField value={zipcode} onChange={(event)=>setZipcode(event.target.value)} fullWidth variant="outlined" label="Zip Code"/>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth variant="outlined" label="Description"/>
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
    const fetchAllCompany=async()=>{
      var result=await getData("company/displayallcompanies")
      setList(result.data)
     }
     const handleClickOpen = (rowData) => {
      setCompanyId(rowData.companyid)
      setCompany(rowData.companyname)
      setContactPerson(rowData.contactperson)
      setContactNumber(rowData.mobileno)
      setEmail(rowData.emailid)
      setAddressOne(rowData.addressone)
      setAddressTwo(rowData.addresstwo)
      setCountry(rowData.country)
      setState(rowData.state)
      setCity(rowData.city)
      setZipcode(rowData.zipcode)
      setDescription(rowData.description)
      setOldPicture(rowData.logo)
      setPicture({filename:`${ServerURL}/images/${rowData.logo}`,bytes:""})
      fillCountry();
      fillState();
      fillCity();
      setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
      };
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
              {showCompanyForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
        </div>
        )
      }

      useEffect(function(){
        fetchAllCompany()
       },[])
       const handleClick=()=>{
        //props.history.push({pathname:'/companies'})
        props.setComponent(<Companies setComponent={props.setComponent}/>)
      }

      const handleDelete=async(data)=>{
        Swal.fire({
          imageUrl: '/logo.jpg',
          title: `Do you want to delete ${data.companyname}?`,
          showDenyButton: true,
          confirmButtonText: 'Delete',
          denyButtonText: `Don't Delete`,
        }).then(async(result) => {
          if (result.isConfirmed) {
            result=await postData('company/deletecompany',{companyid:data.companyid})
            if(result)
            {
              Swal.fire('Record Deleted Successfully....')
              fetchAllCompany();
            }
            else{
              Swal.fire('Fail to delete record....')
            }
          } else if (result.isDenied) {
            Swal.fire(`${data.companyname} is Safe`)
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
                  <Button onClick={()=>handleClick()} startIcon={<AddBox/>} variant="contained">New Company</Button>
                </div>
                <div style={{marginLeft:400,fontSize:20,fontWeight:700,letterSpacing:1,padding:5}}>List of Companies</div>
              </div>}
            columns={[
              { title: 'Company Id', field: 'companyid' },
              { title: 'Company Name', field: 'companyname' },
              { title: 'Contact Person', render:rowData=><div><div>{rowData.contactperson}</div><div>{rowData.mobileno}</div><div>{rowData.emailid}</div></div> },
              { title: 'Address', render:rowData=><div><div>{rowData.addressone}</div><div>{rowData.addresstwo}</div></div> },
              { title: 'Country',render: rowData =><div><div>{Country.getCountryByCode(rowData.country).name},{State.getStateByCodeAndCountry(rowData.state,rowData.country).name }</div><div>{rowData.city},{rowData.zipcode}</div></div>},
              { title: 'Description', field: 'description' },
              { title: 'Logo', field: 'logo',
              render: rowData => <Avatar variant="rounded" alt="Company" src={`${ServerURL}/images/${rowData.logo}`} sx={{width: 56, height:56}}/>},
            ]}
            data={list}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Company',
                onClick: (event, rowData) =>handleClickOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Company',
                onClick: (event, rowData) =>handleDelete(rowData)
              }
            ]}
          />
          </div>
          {showDialog()}
        </div>
        )

  }