const express = require ('express')
const  authMiddelware = require ('../middlewares/authMiddelware');
const { bloodGroupDetailsController } = require('../controllers/analyticsController');



const router = express.Router();



//routes

// get all donar records
router.get('/bloodGroups-data',authMiddelware,bloodGroupDetailsController);

//get hospital records



