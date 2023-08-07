import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer"
import { getData, ServerURL, postData } from "../FetchNodeServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import ShoppingCartComponent from './ShoppingCartComponent'
import { useDispatch } from 'react-redux'
import SideBar from "./SideBar"




const useStyles = makeStyles({
    root: {
        background: '#ecf0f1',
    }
})

var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplaySpeed: 3000
};



export default function ProductList(props) {
    console.log(props)
    const [listProducts, setListProducts] = useState([])
    const [listSubCategoryBanner, setSubCategoryBannerList] = useState([])
    const [qty, setQty] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const classes = useStyles();
    var dispatch = useDispatch()



    const fetchAllSubCategoryById = async () => {
        var body = { subcategoryid: props.location.state.subcategoryid }
        var result = await postData("subbanner/displayallsubbannerbyid", body)
        setSubCategoryBannerList(result.data)
    }

    const fetchAllProductList = async () => {
        var body = { subcategoryid: props.location.state.subcategoryid }
        var result = await postData("finalproduct/displayallfinalproductbysubcategoryid", body)
        setListProducts(result.data)
    }

    const fetchAllProductByPrice = async (min,max) => {
        var body = { min:min,max:max }
        var result = await postData("finalproduct/displayallfinalproductbyprice", body)
        setListProducts(result.data)
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
  
    const handleProduct = (pid) => {
        props.history.push({ pathname: '/ProductPreview' }, { finalproductid: pid })
      }

    const ShowProducts = () => {

        return listProducts.map((item) => {
            return (<div style={{ fontSize: 30, fontWeight: 'bold', letterSpacing: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 2 }}>
                <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 300, height: 320, background: '#fff', margin: 10, padding: 8 }} elevation={2}>
                    <div style={{ fontSize: 16, fontWeight: 500, letterSpacing: 2, textAlign: 'center', padding: 5 }}>{item.companyname} {item.productname}</div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 150, height: 150 }} onClick={()=>handleProduct(item.finalproductid)} />
                    </div>

                    <div style={{ fontSize: 14, fontWeight: '400', letterSpacing: 2, textAlign: 'center', padding: 5 }}>

                        <div>{item.modelname}</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        {item.offerprice > 0 ? <div style={{ fontSize: 18, fontWeight: '500', letterSpacing: 2 }}>&#8377;{item.offerprice}<s style={{ color: '#353b48', fontSize: 12, fontWeight: '400', letterSpacing: 1, padding: 5 }}>&#8377;{item.price}</s><div style={{ color: 'darkgreen', fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>You Save &#8377; {item.price - item.offerprice}</div></div> : <><div style={{ fontSize: 18, fontWeight: '500', letterSpacing: 1 }}>&#8377;{item.price}</div><div style={{ color: 'darkgreen', fontSize: 15, fontWeight: '500', letterSpacing: 1 }}>&nbsp;</div></>}
                    </div>
                    <div sx={{ padding: 5 }}>
                        <ShoppingCartComponent value={qty} onChange={(value) => handleQtyChange(value, item)} />
                    </div>
                </Paper>

            </div>
            )
        })
    }

    useEffect(function () {
        fetchAllProductList();
        fetchAllSubCategoryById();
    }, [])

    const showSlider = () => {
        return listSubCategoryBanner.map((item) => {
            return <div>
                <img src={`${ServerURL}/images/${item.images}`} style={{ width: "100%", height: 400, marginTop: 45 }} />
            </div>
        })
    }

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Slider {...settings}>
                {showSlider()}
            </Slider>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                <div style={{ padding: 10 }}>
                    <SideBar fetchAllProductByPrice={fetchAllProductByPrice}/>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, flexWrap: 'wrap' }}>
                    {ShowProducts()}
                </div>
            </div>
            <Footer />

        </div>
    )
}