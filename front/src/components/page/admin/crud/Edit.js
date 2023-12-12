import React from "react";
import { useParams } from "react-router-dom";
import EditForm from "./EditForm";



const Edit =()=>{

    const {id}=useParams()

    return(
        <>
        <p>{id} </p>
        </>
    )
}

export default Edit