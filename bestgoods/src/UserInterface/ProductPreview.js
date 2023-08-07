import React, { useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import { Container, Grid, TextField,Button,Box} from '@mui/material';
import Header from "./Header"
import Footer from "./Footer"
import { postData,ServerURL } from '../FetchNodeServices';
import Rating from '@mui/material/Rating';
import CircleIcon from '@mui/icons-material/Circle';
import ShoppingCartComponent from './ShoppingCartComponent'
import { useDispatch } from 'react-redux'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded';

const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    }
})

export default function ProductPreview(props) {
    const classes = useStyles();
    const [product, setProduct] = useState([])
    const [qty, setQty] = useState(0)
    const [refresh, setRefresh] = useState(false)
    var dispatch = useDispatch()

    const fetchProduct = async () => {
        var body = { finalproductid: props.location.state.finalproductid }
        var result = await postData("finalproduct/displayfinalproductbyfinalproductid", body)
        setProduct(result.data)
    }

    const handleQtyChange = (value, item) => {
        if (value > 0) {
            item['qty'] = value
            setQty(value)
            dispatch({ type: 'ADD_ITEM', payload: [item.finalproductid, item] })

        }
        else {
            dispatch({ type: 'REMOVE_ITEM', payload: [item.finalproductid, item] })
        }
        setRefresh(!refresh)
    }
    useEffect(function () {
       fetchProduct()
    }, [])

    const showProductPreview = () => {

        return product.map((item) => {
            return (
                <div style={{display:'flex',flexDirection:'row',marginTop:45}}>
                <Grid container spacing={1}>
                <Grid item xs={6} style={{ height:500,width:'40%',display:'flex',justifyContent:'center',alignItems:'center',background:'#fff'}}>
                    <img src={`${ServerURL}/images/${item.picture}`} style={{height:300,width:300,padding:50}} />
                </Grid>
                <Grid item xs={6} style={{ height:500,width:'60%',background: '#fff',display:'flex',justifyContent:'left',alignItems:'left',padding:20,flexDirection:'column'}}>
                        <div style={{fontWeight:'bold',fontSize:30,paddingTop:45,paddingBottom:10}}>{item.productname}</div>
                        <Rating name="size-medium" defaultValue={2} size="medium" style={{paddingBottom:8}} />
                        <div style={{paddingBottom:8}}>
                        {item.offerprice > 0 ? <div style={{ fontSize: 20, fontWeight: '500', letterSpacing: 2 }}>&#8377;{item.offerprice}<s style={{ color: '#353b48', fontSize: 15, fontWeight: '400', letterSpacing: 1, padding: 5 }}>&#8377;{item.price}</s></div> : <><div style={{ fontSize: 20, fontWeight: '500', letterSpacing: 1 }}>&#8377;{item.price}</div></>}
                       </div>
                       <div style={{fontSize:12,paddingBottom:20}}>Tax included.</div>
                       <ShoppingCartComponent value={qty} onChange={(value) => handleQtyChange(value, item)} />
                       <span style={{fontWeight:'bold',fontSize:15,paddingBottom:25}}><LocalOfferRoundedIcon style={{color:'green',paddingRight:5}}/>Offers Available</span>
                       <Box border={1} borderColor="#bdc3c7" width={600} height={40}></Box>
                </Grid>
                </Grid>
            </div>
            )
        })
    }
    
    return(
        <div className={classes.root}>
            <Header history={props.history}/>
            {showProductPreview()}
            <Footer/>
        </div>
    )
}
