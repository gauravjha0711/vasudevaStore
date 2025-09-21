const mongoose = require("mongoose");
const bcrypt = require("bcrypt") ; 
const MONGO_URL = "mongodb://127.0.0.1:27017/vashudevstore";

main().then(() => {
    console.log(`Connected to db`);
}).catch((err) => {
    console.log(`There is an error in the code ${err}`);
})


async function main() {
    await mongoose.connect(MONGO_URL);
}


const userModel = require("./src/Components/userModel");
const express = require("express");
const app = express();

const cors = require('cors');

const corsOptions = {
    origin: "http://localhost:3000", 
    methods: ["POST", "GET", "DELETE", "PUT", "PATCH"], 
    credentials: true, 
};

app.use(express.json());
app.use(cors(corsOptions));


app.get("/helloAll", (req, res) => {
    res.send("Hello How are you");
    console.log("Hello How are you")  ;
});


app.post('/userInfocheckUser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
            console.log("Email Not Found") ; 
        }
        // console.log("Password send by the user is :- ") ; 
        // console.log(password) ; 
        // console.log("Required password is :- ") 
        // console.log(user.password) ; 
       if(password != user.password){
            return res.status(401).json({ message: 'Invalid password' });
            // console.log("Password not found") ; 
        }else{
            console.log("User Found") ; 
        }
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', details: error.message });
    }
});


app.post('/userInfo/users', async(req, res) => {
    try {
        const { name, email, phone, location, pin , address , houseNo ,password  } = req.body;
        // const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            name : name , 
            email : email , 
            phone : phone , 
            location : location , 
            pin : pin , 
            address : address , 
            houseNo : houseNo , 
            password : password ,
        })
        console.log(req.body) ; 

          await newUser.save();
          console.log(`New User added: ${newUser}`);

          res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error while saving user:', err);
        res.status(500).json({ error: 'Server error', details: err.message });
    }
});






app.get("/",(req,res)=>{
    res.send("It's Working") ; 
})

const PORT = 5000; // Define a port
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

