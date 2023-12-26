const asynHandler= require("express-async-handler");
const User= require("../model/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const registerUser= asynHandler(async(req,res)=>{

    const {username,email,password}=req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("all fields are mandatory");

    }

    const presentUsername= await User.findOne({email});
    if (presentUsername){
        res.status(400);
        throw new Error("User with same email exit");
    }

    const hashedPassword= await bcrypt.hash(password,10);
    const createUser=await User.create({
        username,
        email,
        password:hashedPassword
    })

    console.log(`User ${createUser} created successfully`);

    if (createUser){
        res.status(201).json({
            _id:createUser.id,
            email:createUser.email
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid Data bruh!!");
    }


    res.json({message:"Register User"})

});


const loginUser=asynHandler(async(req,res)=>{
    const {email,password}=req.body;
    if (!email||!password){
        res.status(400);
        throw new Error("Sorry bruh fill the info!!");
    }

    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:"20m"
        })
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("incorrect user name or password");
    }

    res.json({message:"Login User"})

});

const currentUser=asynHandler(async(req,res)=>{

    res.json(req.user);

});


module.exports={registerUser,loginUser,currentUser};