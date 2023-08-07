import React, { useEffect, useState, createRef } from "react";
import Header from "./Header";
import Footer from "./Footer"
import { getData, ServerURL } from "../FetchNodeServices"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { makeStyles } from "@mui/styles";
import { Paper } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, PhotoSizeSelectActualRounded } from "@mui/icons-material"

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

var csettings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplaySpeed: 3000
};

export default function Home(props) {
    console.log("Home", props)
    var cSlider = createRef();
    const [listBanner, setListBanner] = useState([])
    const [categoryList, setCategoryList] = useState([])
    const [subCategoryList, setSubCategoryList] = useState([])
    const [trendingList, setTrendingList] = useState([])
    const classes = useStyles();
    const fetchAllBanner = async () => {
        var result = await getData("banner/displayallbanner")
        setListBanner(result.data)
    }

    const fetchAllTrending = async () => {
        var result = await getData("finalproduct/displayallfinalproducttrending")
        setTrendingList(result.data)
    }

    const showSlider = () => {
        return listBanner.map((item) => {
            return <div>
                <img src={`${ServerURL}/images/${item.image}`} style={{ width: "100%", height: 300 }} />
            </div>
        })
    }

    const ShowCategories = () => {

        return categoryList.map((item) => {
            return (<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ padding: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', width: 150, height: 150, borderRadius: "50%", background: '#fff', margin: 10 }}>
                    <img src={`${ServerURL}/images/${item.icon}`} style={{ width: 130, height: 130 }} />
                </div>
                <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>{item.categoryname}</div>
            </div>)
        })
    }

    const ShowSubCategories = () => {

        return subCategoryList.map((item) => {
            return (<Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 400, height: 400, background: '#fff', margin: 10, padding: 5 }} elevation={2}>
                <div style={{ fontSize: 28, fontWeight: 'bold', letterSpacing: 2, padding: 10 }}>{item.subcategoryname}</div>
                <div style={{ fontSize: 14, fontWeight: 600, padding: 10, letterSpacing: 1 }}>{item.description}</div>
                <div style={{ fontSize: 12, fontWeight: 'bold', color: 'red' }}>{"View all >"}</div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 250, height: 250 }} />
                </div>
            </Paper>)
        })
    }

    const ShowTrending = () => {

        return trendingList.map((item) => {
            return (<div style={{ fontSize: 30, fontWeight: 'bold', letterSpacing: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 10 }}>
                <Paper style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: 300, height: 300, background: '#fff', margin: 10, padding: 5 }} elevation={2}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 150, height: 150 }} />
                    </div>
                </Paper>
                <div style={{ fontSize: 18, fontWeight: '400', letterSpacing: 2 }}>{item.productname}</div>
                {item.offerprice > 0 ? <div style={{ fontSize: 20, fontWeight: '500', letterSpacing: 2 }}>&#8377;{item.offerprice}<s style={{ color: '#353b48', fontSize: 12, fontWeight: '400', letterSpacing: 2, padding: 5 }}>&#8377;{item.price}</s></div> : <div style={{ fontSize: 20, fontWeight: '500', letterSpacing: 2 }}>&#8377;{item.price}</div>}
            </div>)
        })
    }

    const fetchAllCategory = async () => {
        var result = await getData("category/displayallcategory")
        setCategoryList(result.data)
    }

    const fetchAllSubCategory = async () => {
        var result = await getData("subcategory/displayallsubcategory")
        setSubCategoryList(result.data)
    }



    useEffect(function () {
        fetchAllBanner()
        fetchAllCategory()
        fetchAllSubCategory()
        fetchAllTrending()
    }, [])

    const handleBack = () => {
        cSlider.current.slickPrev()
    }

    const handleForward = () => {
        cSlider.current.slickNext()
    }

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <div style={{ marginTop: 50 }}>
                <Slider {...settings}>
                    {showSlider()}
                </Slider>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <ArrowBackIos onClick={() => handleBack()} />
                    <div style={{ width: 1200, padding: 10 }}>

                        <Slider ref={cSlider} {...csettings}>
                            {ShowCategories()}
                        </Slider>

                    </div>
                    <ArrowForwardIos onClick={() => handleForward()} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, flexWrap: 'wrap' }}>
                    {ShowSubCategories()}
                </div>
                <div style={{ fontSize: 30, fontWeight: 'bold', letterSpacing: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10 }}>
                    Trending Products
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, flexWrap: 'wrap' }}>
                    {ShowTrending()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 10, flexWrap: 'wrap' }}>
                    <div style={{
                        color: '#FFF',
                        background: "#000",
                        border: 'none',
                        padding: "12px 22px",
                        textAlign: 'center',
                        display: "inline-block",
                        margin: "4px 2px",
                        cursor: "pointer",
                        borderRadius: 25,
                        fontWeight: 600
                    }}>
                        {"View All >"}
                    </div>
                </div>
                <Footer />
            </div>
        </div>)
}