const express= require("express");
const router=express.Router();

const {createContact}=require("../controller/contactController");
const {getContact}= require("../controller/contactController");
const {getIDContact}=require("../controller/contactController");
const {updateContact}=require("../controller/contactController");
const {deleteContact}=require("../controller/contactController");
const validToken = require("../middleware/tokenHandler");


router.use(validToken);

router.route('/').get(getContact);


router.route('/').post(createContact);

router.route('/:id').get(getIDContact);


router.route('/:id').put(updateContact);


router.route('/:id').delete(deleteContact);

module.exports=router;