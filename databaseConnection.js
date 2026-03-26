const mongoose = require("mongoose");

function DBconnect(){
    const DB_URL = process.env.MONGO_URL;
    mongoose.connect(DB_URL).then(()=>{
        console.log("Database connected successfully")
    })
    .catch((err)=>{
        console.log("Error connecting to database",err)
    })
    
};

module.exports = DBconnect;