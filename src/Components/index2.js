const mongoose = require("mongoose") ; 

const MONGO_URL = "mongodb://127.0.0.1:27017/saistore" ; 

main().then(()=>{
    console.log(`Connected to db`) ; 
}).catch((err)=>{
    console.log(`There is an error in the code ${err}`) ; 
})





async function main(){
    await mongoose.connect(MONGO_URL) ; 
}




const userModel = require("./userModel"); 
const express = require("express");
const app = express();

const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get("/helloAll",(req,res)=>{
    res.send("Hello How are you") ; 
})

app.post('http://localhost:3000/userInfo/users', (req, res) => {
    try {
        res.send("Hello How are you") ; 
    //   const { name, email, phone, location } = req.body;
    // //   const newUser = new userModel({
    // //     name 
    // //   });
    // const newUser = new userModel({
    //     name : name , 
    //     email : email , 
    //     phone : phone , 
    //     location : location

    // })
  
    //   await newUser.save();
    //   console.log(`New User added: ${newUser}`);
  
    //   res.status(201).json({ message: 'User created successfully', user: newUser });
    // console.log(`The name is :- ${name}`) ; 
    } catch (err) {
      console.error('Error while saving user:', err);
      res.status(500).json({ error: 'Server error', details: err.message });
    }
  });

const PORT = 3000; // Define a port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

