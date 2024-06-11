const express = require ('express')
const  authMiddelware = require ('../middlewares/authMiddelware');
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationForHospitalController, getInventoryHospitalController, getRecentInventoryController} = require("../controllers/inventoryController");


const router = express.Router();



//routes
router.post('/create-inventory',authMiddelware,createInventoryController);
// get all blood records
router.get('/get-inventory',authMiddelware,getInventoryController);

// get all hospital blood records
router.post('/get-inventory-hospital',authMiddelware,getInventoryHospitalController);



router.get('/get-recent-inventory',authMiddelware,getRecentInventoryController);

// get all donar records
router.get('/get-donars',authMiddelware,getDonarsController);

//get hospital records
router.get('/get-hospital',authMiddelware,getHospitalController);

router.get('/get-organisation',authMiddelware,getOrganisationController);



router.get('/get-organisation-for-hospital',authMiddelware,getOrganisationForHospitalController);
module.exports = router;


