const express= require("express");
const { registerUser, loginUser, currentUser } = require("../controller/userController");
const validToken = require("../middleware/tokenHandler");
const router =express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);

router.get("/current", validToken,currentUser);

module.exports=router;