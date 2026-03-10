const express = require("express");

const app = express();

const PORT = 8081;

app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json({
        message:"Home Page:-)"
    })
})

app.use((req,res)=>{
    res.status(404).json({
        message:"Route not found"
    })
});


app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`)

})