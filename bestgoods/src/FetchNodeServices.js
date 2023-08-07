var ServerURL="http://localhost:5000/"
var axios=require("axios")
//purpose is to read all data
const getData=async(url)=>{
try{
 var response=await fetch(`${ServerURL}${url}`)
 var result=await response.json({})
 return result;
}
catch(e)
{
    console.log("Error:",e)
    return null;
}
}
//used when queries contain parameters
const postData=async(url,body)=>{
    try{
        var response=await fetch(`${ServerURL}${url}`,{
            method:"POST",
            mode:"cors",
            headers:{"Content-Type":"application/json;charset=utf-8"},
            body:JSON.stringify(body),
        });
        var result=await response.json()
        return result;
    }
    catch(e)
    {
        console.log("Error:",e)
        return null;
    }
}

const postDataAndImage=async(url,formData)=>{
    try{
        var response=await axios.post(`${ServerURL}${url}`,formData,{headers:{"content-type":'multipart/formData'}});
        var result=await response.data.result;
        return result;
    }
    catch(e)
    {
        console.log("Error:",e)
        return null;
    }
}

const postDataAndImageWithId=async(url,formData)=>{
    try{
        var response=await axios.post(`${ServerURL}${url}`,formData,{headers:{"content-type":'multipart/formData'}});
        var result=await response.data;
        return result;
    }
    catch(e)
    {
        console.log("Error:",e)
        return null;
    }
}
export{getData,postData,ServerURL,postDataAndImage,postDataAndImageWithId}