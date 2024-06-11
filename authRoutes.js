const express = require('express');
const { registerController, loginController,currentUserController, } = require('../controllers/authController');
const authMiddelware  = require("../middlewares/authMiddelware");

const router = express.Router();

// Define route handler for registering users
router.post('/register', registerController);


//LOGIN || POST

router.post('/login',loginController );


//GET CURRENT user 
router.get('/current-user', authMiddelware, currentUserController) 


module.exports = router;


