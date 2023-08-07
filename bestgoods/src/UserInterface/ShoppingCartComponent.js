import React, { useEffect, useState, createRef } from "react";
import { makeStyles } from "@mui/styles";
import { Button, Avatar } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, ShoppingCartOutlined } from "@mui/icons-material"

const useStyles = makeStyles({
    roundDiv: {
        border: '2px solid #000',
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    }
})


export default function ShoppingCartComponent(props) {
    const classes = useStyles();
    const [value,setValue]=useState(props.value);
    const handleMinus=()=>{
       var c=value-1
       if(c>=0)
        setValue(c)
        props.onChange(c)
    }
    const handlePlus=()=>{
        var c=value+1
       setValue(c)
       props.onChange(c)
    }
    const handleClick=()=>{
        var c=value+1
       setValue(c)
       props.onChange(c)
    }
    return (
        <div>
        {value==0?<div><Button onClick={()=>handleClick()} sx={{margin:2,width:200,background:'#000',color:'#fff'}} variant="contained" endIcon={<ShoppingCartOutlined />}>Add to Cart</Button></div>:
            <div style={{ display: 'flex', flexDirection: 'row',alignItems:'center'}}>
                <Avatar onClick={()=>handleMinus()} sx={{ bgcolor:'#000',color:'#fff',fontSize:24,fontWeight:'bold',margin:2 }} variant="square">
                    -
                </Avatar>
                <div style={{fontSize:18,fontWeight:'bold',textAlign:'center'}}>{value}</div>
                <Avatar onClick={()=>handlePlus()} sx={{ bgcolor:'#000',color:'#fff',fontSize:24,fontWeight:'bold',margin:2 }} variant="square">
                    +
                </Avatar>
            </div>
    }
    </div>
    )
}