
const express = require("express");
const mongoose = require("mongoose");
const app  = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))

//connectes to database server

const ConnectedToServer = async()=>{
    try {  await mongoose.connect('mongodb://127.0.0.1:27017/ToufiqData');
    console.log('connected');
        
    } catch (error) {
        console.log("not connected");
        console.log(error.message);
        process.exit(1);
    }
}

//created to schema

const dataschema =new mongoose.Schema({
      email:{
        type: String,Number,
        required: true,
      },
      createdAt:{
        type: Date,
        default: Date.now,
      }

});

//created model
const dataModel = mongoose.model('Student',dataschema)





// get methoed

app.get("/",(req,res)=>{
    res.send("<h1>This is home route</h1>")
});

app.get("/Sdata",(req,res)=>{
    res.sendFile(__dirname + "/index.html")
});
app.post("/Sdata",async(req,res)=>{

    try {
        const mydata = new dataModel({
           email: req.body.email 
        })
        const savedata = await mydata.save();
        res.status(200).send(savedata)
    } catch (error) {
       res.status(500).send({message: error.message}) 
    }
    
})








app.listen(port,async()=>{
    console.log(`the server is running at http://localhost:${port}`);
   await ConnectedToServer();
})