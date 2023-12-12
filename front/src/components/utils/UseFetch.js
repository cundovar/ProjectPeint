import  { useEffect, useState } from "react";



const UseFetch=(jsonUrl)=>{

    const [jsonData,setJsonData]=useState([]);
    const [error,setError]=useState(null);

    useEffect(()=>{
        fetch(jsonUrl)
        .then((response)=>response.json())
        .then((data)=>{
            setJsonData(Object.values(data));
        })
        .catch((error)=>setError("erreur chargements données"))
    },[jsonUrl])

    return{
        data:jsonData,
        error:error,
    };



};
export default UseFetch