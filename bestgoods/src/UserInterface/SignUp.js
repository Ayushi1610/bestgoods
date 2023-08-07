import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Grid, TextField, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import Header from './Header'
import Divider from '@mui/material/Divider';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Footer from "./Footer"
import {postData} from "../FetchNodeServices"
const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    }
})

export default function SignUp(props) {
    const classes = useStyles();
    const [firstname,setFirstName]=useState('')
    const [lastname,setLastName]=useState('')
    const [mobileno,setMobileno]=useState('+91'+props.history.location.state.mobileno)
    const [emailid,setEmailid]=useState('')
    const [values, setValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });

      const [cvalues, setcValues] = useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showcPassword: false,
      });

    const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };

      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

      const handleClickShowCPassword = () => {
        setcValues({
          ...cvalues,
          showcPassword: !cvalues.showcPassword,
        });
      };
    
      const handleMouseDownCPassword = (event) => {
        event.preventDefault();
      };

      const handleConfirmChange = (prop) => (event) => {
        setcValues({ ...cvalues, [prop]: event.target.value });
      };
      const handleSubmit=async()=>
      { if(cvalues.password===values.password)
        {
          var body={mobileno:mobileno,emailid:emailid,firstname:firstname,lastname:lastname,password:values.password}
         var result=await postData("users/insertuser",body)
        }
        else{
            alert("Password/Confirm Password Not Matched")
        }
      }

    return (
        <div className={classes.root}>
            <Header history={props.history}/>
            <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', padding: 30, borderRadius: 10,marginTop:45 }}>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', background: '#fff', borderRadius: 10 }}>
                    <Grid item xs={7} >
                        <Container style={{ height: 600, background: '#fff', borderRadius: 10 }}>
                            <img src="/signup.jpg" style={{ height: 580, width: '100%', borderRadius: 10 }} />
                        </Container>
                    </Grid>
                    <Grid item xs={5} >
                        <Container style={{ height: 600, background: '#fff', borderRadius: 10 }}>
                            <div style={{ height: 580, background: '#fff', border: '1px solid grey', width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
                                <div >
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                        <div style={{ fontSize: 30, fontWeight: 'bold', margin: 20 }}>Sign Up <div style={{ fontSize: 14, fontWeight: 'bold' }}>Please enter your details.</div></div>
                                        <div style={{ marginLeft: 250 }} ><PersonAddIcon style={{ margin: 20, width: 50, height: 50 }} /></div>
                                    </div>
                                    <Divider variant="middle" style={{ marginBottom: 10 }} />
                                    <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                            <TextField
                                                label='Your First Name'
                                                id="outlined-size-small"
                                                size="small"
                                                style={{ width: 250, marginLeft: 20 }}
                                                onChange={(event)=>setFirstName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                label='Your Last Name'
                                                id="outlined-size-small"
                                                size="small"
                                                style={{ width: 250 }}
                                                onChange={(event)=>setLastName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label='Your Email-id'
                                                id="outlined-size-small"
                                                size="small"
                                                style={{ width: 520, marginLeft: 20 }}
                                                onChange={(event)=>setEmailid(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                        <FormControl  variant="outlined">
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={values.showPassword ? 'text' : 'password'}
                                                value={values.password}
                                                onChange={handleChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder='Password'
                                                size="small"
                                                style={{ width: 250, marginLeft: 20 }}
                                            />
                                        </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                        <FormControl  variant="outlined">
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={cvalues.showcPassword ? 'text' : 'password'}
                                                value={cvalues.password}
                                                onChange={handleConfirmChange('password')}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowCPassword}
                                                            onMouseDown={handleMouseDownCPassword}
                                                            edge="end"
                                                        >
                                                            {cvalues.showcPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                placeholder='Confirm Password'
                                                size="small"
                                                style={{ width: 250 }}
                                            />
                                        </FormControl>
                                        </Grid>
                                    </Grid>
                                    <div style={{ marginLeft: 20, fontSize: 12}}>Use 8 or more characters with a mix of letters & numbers</div>
                                    <div style={{ marginLeft: 20, fontSize: 20,fontWeight:'bold',marginTop:10,marginBottom:10}}>Verify</div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                                    <div style={{ marginLeft: 20, fontSize: 12}}>We have sent 4 digit OTP on <b>{mobileno}</b></div>
                                    <div style={{ marginLeft: 200,color:'red',fontSize: 12 }} >Change</div>
                                    </div>
                                    <Grid item xs={12}>
                                            <TextField
                                                label='Enter OTP'
                                                id="outlined-size-small"
                                                size="small"
                                                style={{ width: 520, marginLeft: 20,marginTop:20 }}
                                            />
                                    </Grid>
                                    <div style={{ marginLeft: 480,color:'red',fontSize: 12 }} >Resend OTP</div>
                                    <Button onClick={handleSubmit} variant="contained"  style={{width:520,margin:20,background:'#000'}}>
                                        <b>Verify</b>
                                    </Button>
                                    <div style={{ marginLeft: 20, color: 'grey',fontSize:12,padding:30,textAlign:'center' }}>By continuing you agree to our<span style={{color:'red'}}> Terms of service </span>and<div style={{color:'red',textAlign:'center'}}> Privacy & Legal Policy.</div></div>
                                </div>
                            </div>
                        </Container>
                    </Grid>
                </Grid>
            </Grid>
            <Footer/>
        </div>
    )

}