import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Grid, TextField, Button, Paper, Box } from '@mui/material';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import BackpackIcon from '@mui/icons-material/Backpack';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import PaymentIcon from '@mui/icons-material/Payment';
import AddIcon from '@mui/icons-material/Add';
import ToggleButton from '@mui/material/ToggleButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Drawer from '@mui/material/Drawer';
import Checkbox from '@mui/material/Checkbox';
import Header from './Header'
import Footer from './Footer'
import { postData, ServerURL } from '../FetchNodeServices'
import { useSelector,useDispatch } from 'react-redux'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { ListItemIcon } from '@mui/material';


const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    },
    divided: {
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        flexGrow: 1,
        borderBottom: '1px solid grey',
        margin: 5,
    }
})
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function OrderSummary(props) {
    const classes = useStyles();
    const [addressStatus, setAddressStatus] = useState({ status: false, body: [] })
    const [addressOne, setAddressOne] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [states, setStates] = useState('')
    const [city, setCity] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [getMobileno, setMobileno] = useState('')
    const [zipcode, setZipcode] = useState('')
    var user = useSelector(state => state.user)
    var userData = Object.values(user)[0]
    var cart = useSelector(state => state.cart)
    var keys = Object.keys(cart)
    var cartitems = Object.values(cart)
    var dispatch=useDispatch()
    var totalamount = cartitems.reduce((a, b) => getTotalAmount(a, b), 0)
    function getTotalAmount(p1, p2) {
        var price = p2.offerprice > 0 ? p2.offerprice * p2.qty : p2.price * p2.qty
        return (price + p1)
    }
    var netamount = cartitems.reduce((a, b) => getNetAmount(a, b), 0)
    function getNetAmount(p1, p2) {
        var price = p2.price * p2.qty
        return (price + p1)
    }
    var savings = cartitems.reduce((a, b) => getSavings(a, b), 0)
    function getSavings(p1, p2) {
        var price = p2.offerprice > 0 ? (p2.price - p2.offerprice) * p2.qty : 0
        return (price + p1)
    }

    /*****Drawer******/
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const handleProceed = () => {
        props.history.push({ pathname: '/signin' })
    }

    const toggleDrawer = (anchor, open) => (event) => {
        
        setState({ ...state, [anchor]: open });
    };

    const handleAddress = async () => {
        var body = { mobileno:getMobileno,addressone: addressOne, addresstwo: addressTwo, state: states, city: city, zipcode: zipcode,firstname:firstname,lastname:lastname,usermobileno:userData.mobileno }
        var result = await postData('users/addnewaddress', body)
        alert(result)
        checkAddress()
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
            role="presentation"
        >
            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390, justifyContent: 'center' }}>
                <img
                    component="div"
                    sx={{ display: { xs: 'none', sm: 'block' } }}
                    src="/logo.jpg"
                    width="120"
                />
            </div>
            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                <span style={{ fontWeight: 'bold', fontSize: 16 }}>{userData.firstname} {userData.lastname}</span>
            </div>
            <div style={{ padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: 390 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                        <TextField label="First Name" value={firstname} onChange={(event) =>setFirstname(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Last Name" value={lastname} onChange={(event) =>setLastname(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Mobile Number" value={getMobileno} onChange={(event) =>setMobileno(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address Line One" onChange={(event) =>setAddressOne(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Address Line Two" onChange={(event) =>setAddressTwo(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="State" onChange={(event) =>setStates(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="City" onChange={(event) =>setCity(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="ZipCode" onChange={(event) =>setZipcode(event.target.value)} variant="outlined" fullWidth />
                    </Grid>
                </Grid>
                <Divider />

                <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                    <Button variant="contained" fullWidth style={{ background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 16 }} onClick={handleAddress}>Save New Address</Button>
                </div>
            </div>
        </Box>
    );
    /****************/

    const checkAddress = async () => {
        var result = await postData("users/checkuseraddress", { mobileno: userData.mobileno })
        setAddressStatus({ status: result.result, data: result.data })
        if(!result.result)
        {
            setMobileno(userData.mobileno)
            setFirstname(userData.firstname)
            setLastname(userData.lastname)
        }

    }
    useEffect(function () {
        checkAddress()
    }, [])
    const handleSetAddress=(item)=>{
        dispatch({type:'ADD_DA',payload:[item.mobileno,item]})
    }
    const handleMakePayment=()=>{
        props.history.push({pathname:'/paymentgateway'})
    }

    const fetchAddress = () => {
        return addressStatus.data.map((item) => {
            return(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'top',width:'100%',padding:5,justifyContent:'center',alignItems:'center'}} >
                <Button style={{ background: '#ecf0f1', padding: 20, width: '90%' }} onClick={()=>handleSetAddress()}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'top', background: '#ecf0f1' }}>
                        <div style={{fontWeight:'bold'}}>+91{item.mobileno}</div>
                        <div><b>{item.firstname} {item.lastname}</b></div>
                        <div>{item.addressone},{item.addresstwo}<br />{item.state},{item.city},{item.zipcode}</div>
                    </div>
                </Button>
                
            </div>)
        }
        )
    }


    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'row', padding: 40, paddingLeft: 100, paddingRight: 100, marginTop: 45 }}>

                <Grid item xs={7} style={{ alignItems: 'left' }}>
                    <div style={{ fontWeight: 'bold', fontSize: 25, letterSpacing: 2 }}>Order Summary</div>
                    <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, marginTop: 30, width: '80%', padding: 10 }}>
                            <div style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Select Delivery Address</div>
                            <div style={{ display: 'flex', flexDirection: 'column',justifyContent:'center',alignItems:'center' }}>
                                {addressStatus.status ?
                                    <>
                                    <div style={{ padding: 10, width: '90%' }}><Button variant='contained' onClick={toggleDrawer('right',true)} style={{ background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 16 }} fullWidth >Add New Address</Button></div>
                                      {fetchAddress()}
                                      
                                    </>
                                    : <><div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                                        <Button onClick={toggleDrawer('right', true)} variant="contained" fullWidth style={{ background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Add New Address</Button>
                                    </div></>}

                            </div>
                        </Grid>
                        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, marginTop: 30, width: '80%', padding: 10 }}>
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>Cart Items({keys.length})</span>
                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 'auto' }}>Total : &#8377;{totalamount}</span>
                            </div>
                            <List>
                                {cartitems.map((item, index) => (
                                    <ListItem button>
                                        <ListItemIcon>
                                            <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 80, borderRadius: 10 }} />
                                        </ListItemIcon>
                                        <div style={{ display: 'flex', flexDirection: 'column', padding: 5, width: '70%' }}>
                                            <ListItemText primary={item.productname} style={{ fontWeight: 'bold' }} />
                                            <ListItemText primary={item.offerprice > 0 ? <div style={{ fontSize: 18, fontWeight: '500', letterSpacing: 2 }}><s style={{ color: '#353b48', fontSize: 12, fontWeight: '400', letterSpacing: 1, padding: 5 }}>&#8377;{item.price}</s>&#8377;{item.offerprice} x {item.qty}<div style={{ display: 'flex', color: 'darkgreen', fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>You Save &#8377; {(item.price - item.offerprice) * item.qty}<span style={{ marginLeft: 'auto' }}>&#8377;{item.offerprice * item.qty}</span></div></div> : <><div style={{ width: 280, fontSize: 18, fontWeight: '500', letterSpacing: 1 }}>&#8377;{item.price} x {item.qty}</div><div style={{ display: 'flex', color: 'darkgreen', fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>&nbsp;<span style={{ marginLeft: 'auto' }}>&#8377;{item.price * item.qty}</span></div></>} />
                                        </div>

                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                    </Grid>
                </Grid>
                <Grid item xs={5} >
                    <div className={classes.divided}>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}><ShoppingCart style={{ color: 'blue' }} /><div style={{ fontSize: 12, padding: 5 }} >Your Cart</div></div>
                        <span className={classes.divider}></span>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}><BackpackIcon style={{ color: 'blue' }} /><div style={{ fontSize: 12, padding: 5 }} >Order Summary</div></div>
                        <span className={classes.divider}></span>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: 10 }}><PaymentIcon /><div style={{ fontSize: 12, padding: 5 }} >Payment</div></div>
                    </div>
                    <Grid container spacing={1} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Grid item xs={12} style={{ marginBottom: 20 }} >
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <div><img src="whatsapp.png" style={{ width: 55, height: 40, padding: 10 }} /></div>
                                <div style={{ fontWeight: 'bold', fontSize: 15, padding: 10 }}>Enable order updates and important information on Whatsapp</div>
                                <Checkbox {...label} />
                            </div>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ background: '#fff', borderRadius: 10, padding: 20 }}>
                            <div style={{ fontSize: 20, fontWeight: 'bold', padding: 10 }}>Payment Details</div>
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>Net Amount:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 'auto' }}>Total : &#8377;{netamount}</span>
                            </div>
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>Savings:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 'auto' }}>Total : &#8377;{savings}</span>
                            </div>
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>Delivery Charges:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 'auto' }}>Total : &#8377;{0}</span>
                            </div>
                            <Divider />
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                                <span style={{ fontWeight: 'bold', fontSize: 16 }}>Final Amount:</span>
                                <span style={{ fontWeight: 'bold', fontSize: 16, marginLeft: 'auto' }}>Total : &#8377;{netamount - savings}</span>
                            </div>

                        </Grid>
                        <Grid item xs={12}>
                            <div style={{ padding: 5, display: 'flex', alignItems: 'center', width: 390 }}>
                                <Button onClick={()=>handleMakePayment()} variant="contained" fullWidth style={{ background: 'black', color: '#FFF', fontWeight: 'bold', fontSize: 16 }}>Make Payment</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Footer />
            <React.Fragment key={'right'}>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </React.Fragment>
        </div>
    )
}