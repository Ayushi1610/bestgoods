import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Grid, TextField,Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import { InputAdornment } from '@mui/material';
import Header from "./Header"
import Footer from "./Footer"
import { postData } from '../FetchNodeServices';
import {useDispatch} from "react-redux"

const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    }
})

export default function SignIn(props) {
    const classes = useStyles();
    const [mobileno,setMobileNo]=useState('')
    const [generatedOtp,setGeneratedOtp]=useState('')
    const [inputOtp,setInputOtp]=useState('')
    const [visible,setVisible]=useState(false)
    const [userData,setUserData]=useState([])
    var dispatch=useDispatch()
    const otpGenerator=()=>{
        var v=['0','1','2','3','4','5','6','7','8','9']
        var otp=""
        for(var i=1;i<=4;i++)
        {
            otp+=v[parseInt(Math.random()*9)]
        }
        return otp;
    }

    const callOtpServer=async(msg,otp)=>{
        var result=await postData("smsapi/sendotp",{mobileno:mobileno,otp:otp})
    }
    const handleCheckUser=async()=>{
         var result=await postData("users/checkuserbymobilenumber",{mobileno:"+91"+mobileno})
         if(result.result)
         {
             var otp=otpGenerator()
             alert(otp)
             setVisible(true)
             setGeneratedOtp(otp)
             setUserData(result.data)
             callOtpServer(mobileno,otp)
         }
         else{
             props.history.push({pathname:"/signup"},{mobileno:mobileno})
             var otp=otpGenerator()
             setGeneratedOtp(otp)
             callOtpServer(mobileno,otp)
         }
    }
    const handleCheckOtp=()=>{
        if(generatedOtp===inputOtp)
        {
            dispatch({type:"ADD_USER",payload:[mobileno,userData]})
            props.history.push({pathname:'/ordersummary'})
        }
        else
        {
            alert("Incorrect OTP")
        }
    }
    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center' ,padding:30, borderRadius: 10,marginTop:45 }}>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'row', background: '#fff', borderRadius: 10 }}>
                    <Grid item xs={8} >
                        <Container style={{ height:'auto', background: '#fff', borderRadius: 10  }}>
                            <img src="/signin (1).jpeg" style={{ height: 390, width: '100%', marginBottom: 0, borderRadius: 10 }} />
                        </Container>
                    </Grid>
                    <Grid item xs={4} >
                        <Container style={{ height:'auto', background: '#fff' , borderRadius: 10 ,padding:10}}>
                            <div style={{ height:'auto', background: '#fff', border: '1px solid grey', width: '100%', borderRadius: 10, display: 'flex', flexDirection: 'column' }}>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div  ><AccountCircleIcon style={{ margin: 10, width: 50, height: 50 }} /></div>
                                </div>
                                <div style={{}}>
                                    <div style={{ fontSize: 28, fontWeight: 'bold', marginLeft: 20 }}>Sign in</div>
                                    <div style={{ marginLeft: 20, color: 'grey' }}>Sign in to access your Orders, Offers and Wishlist.</div>
                                    <TextField
                                        id="input-with-icon-textfield"
                                        label="Enter your mobile no."
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    +91 |
                                                </InputAdornment>
                                            ),
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <span onClick={()=>setMobileNo('')} style={{color:'red',fontSize:12,cursor:'pointer'}}>Change</span>
                                                </InputAdornment>
                                            ),
                                        }}
                                        value={mobileno}
                                        variant="outlined"
                                        onChange={(event)=>setMobileNo(event.target.value)}
                                        style={{ margin:20, width: '90%'}}
                                    />
                                    <Button onClick={handleCheckUser} variant="contained" endIcon={<SendIcon />} style={{width:'90%',marginLeft:20,background:'#000'}}>
                                        Send
                                    </Button>
                                    
                                    <Grid item xs={12}>
                                        {visible?<>
                                            <TextField
                                                label='Enter OTP'
                                                id="outlined-size-small"
                                                size="small"
                                                onChange={(event)=>setInputOtp(event.target.value)}
                                                style={{ width:'90%', marginLeft: 20,marginTop:10 }}
                                            />
                                             <div style={{ marginLeft: 370,color:'red',fontSize: 12,padding:5 }} >Resend OTP</div>
                                    <Button onClick={()=>handleCheckOtp()} variant="contained"  style={{width:'90%',marginLeft:20,background:'#000'}}>
                                        <b>Verify</b>
                                    </Button>
                                    </>:<></>}
                                    </Grid>
                                   
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