import express from "express";

const app= express();

const PORT =8090;

app.listen(PORT , ()=>{
    console.log(`Server running at port number -> ${PORT}`)
})