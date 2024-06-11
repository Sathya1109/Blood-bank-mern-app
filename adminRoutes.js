const express = require ('express')
const authMiddelware = require('../middlewares/authMiddelware');
const {getDonarsListController, getHospitalListController, getOrganisationListController, deleteDonarController} = require ("../controllers/adminController");
const adminMiddelware = require("../middlewares/adminMiddelware")

const router = express.Router();

//routes 
//get || donar || hospital list

router.get('/donar-list',authMiddelware,adminMiddelware,getDonarsListController);


router.get('/hospital-list',authMiddelware,adminMiddelware,getHospitalListController);


router.get('/org-list',authMiddelware,adminMiddelware,getOrganisationListController);

router.delete('/delete-donar/:id',authMiddelware,adminMiddelware,deleteDonarController)

module.exports = router;
