const express = require("express");
//const {users} = require("./data/users.json");

const dotenv = require("dotenv");

//importing database connection
const DBconnect = require('./databaseConnection');


//routers
const usersRouter = require("./routes/users")
const booksRouter = require("./routes/books")
dotenv.config();
const app = express();


DBconnect();
const PORT = 8081;

app.use(express.json());

app.get("/", (req,res)=>{
    res.status(200).json({
        message:"Home Page:-)"
    })
})

app.use("/users",usersRouter)
app.use("/books",booksRouter)



app.listen(PORT,()=>{
    console.log(`Server is up and running on http://localhost:${PORT}`)

})