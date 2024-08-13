import express from "express";
import cros from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";



const app= express();


//Middle ware ----- 

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
const corsOption ={
    origin:"http//localhost:3000",
    credentials : true
}
app.use(cros(corsOption));


//Home api 
//Get 
//http//localhost:8080/home

app.get("/home" ,(req, res)=>{
    return res.status(200).json({
        message : "I am just tesing my first Api",
        success : true
    })
})

const PORT =8080;

app.listen(PORT , ()=>{
    console.log(`Server running at port number -> ${PORT}`)
})