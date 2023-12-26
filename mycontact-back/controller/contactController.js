const express= require("express");
const asynHandler = require("express-async-handler");
const Contact = require("../model/contactModel")

//Get request to get the contact
const getContact= asynHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);

})

//Post to create
const createContact=asynHandler(async(req,res)=>{
    console.log("the request body is : ",req.body);
    const {name,email,contact}=req.body;

    if (!name||!email||!contact){
        res.status(400);
        throw new Error("All fields are Mandatory!!");
    }
    const contacts=await Contact.create({
        name,
        email,
        contact,
        user_id:req.user.id
    })
    res.status(201).json(contacts);
})

//get for the conatct with id

const getIDContact=asynHandler(async(req,res)=>{
    const contacts= await Contact.find({ _id:req.params.id});
    
    if (!contacts){
        res.status(404);
        throw new Error("Contact ID not found!!");
    } 
    res.status(200).json(contacts);
})

//put ot update the contact


const updateContact = asynHandler(async (req, res) => {
    const { name, email, contact } = req.body;


    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          contact,
          name,
          email,
        },
        $currentDate: { lastUpdated: true },
      },
      { new: true } // Return the modified document
    );

    if (!updatedContact) {
      res.status(404);
      throw new Error("Contact ID not found!!");
    }
  
    res.status(200).json(updatedContact);
  });


//delete the contact 
const deleteContact=asynHandler(async(req,res)=>{
    const contacts= await Contact.find({ _id:req.params.id});
    
    if (!contacts){
        res.status(404);
        throw new Error("Contact ID not found!!");
    }
    await Contact.deleteOne( { _id: req.params.id } )
    res.status(200).json(contacts);
})

module.exports= {getContact,createContact, getIDContact, updateContact, deleteContact}