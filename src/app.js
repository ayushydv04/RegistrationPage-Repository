const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn");

const Register = require("./models/registers");

const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
 

app.get("/", (req, res)=>{
    res.render("index")
})

app.get("/register", (req, res)=>{
    res.render("register")
})


app.get("/login", (req, res)=>{
    res.render("login")
})

app.post("/register", async (req, res)=>{
    try {
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerUser = new Register({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword,
                
            })

            const registered = await registerUser.save();
            res.status(201).render("index");

        }else{
            res.send("Password didn't match");
        }

    } catch (error) {
        res.status(400).send(error);                
    }
})


app.listen(port, ()=>{
    console.log(`Server is running at port no ${port}`);
})