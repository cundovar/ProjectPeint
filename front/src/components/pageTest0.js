import React, { useState } from "react";

const TestReact=()=>{


const [name,setName]=useState('')

const change=(e)=>{
    setName(e.target.value)
}
const reset=()=>{
    setName('')
}
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(new FormData(e.target.value))
}





    return(
        <>
    
        <form onSubmit={handleSubmit}>
            <p>e</p>
            <input type="text" defaultValue='ff' name="prenom"  />
            <p>text</p>
        <input type="text" name="name" value={name} onChange={change} />
        <button onClick={reset} type="button" >reset</button>
        <button type="submit">envoyer</button>
        </form>

        </>
    )
}

export default TestReact