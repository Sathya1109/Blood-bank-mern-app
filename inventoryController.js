const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");

const createInventoryController = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            throw new Error('User Not Found');
        }

        if (req.body.inventoryType === 'out') {
            const requestedBloodGroup = req.body.bloodGroup;
            const requestedQuantityOfBlood = req.body.quantity;
            const organisation = mongoose.Types.ObjectId(req.body.userId);

            const totalInOfRequestedBlood = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'in',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            const totalIn = totalInOfRequestedBlood[0]?.total || 0;

            const totalOutOfRequestedBloodGroup = await inventoryModel.aggregate([
                {
                    $match: {
                        organisation,
                        inventoryType: 'out',
                        bloodGroup: requestedBloodGroup
                    }
                },
                {
                    $group: {
                        _id: '$bloodGroup',
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            const totalOut = totalOutOfRequestedBloodGroup[0]?.total || 0;
            const availableQuantityOfBloodGroup = totalIn - totalOut;

            if (availableQuantityOfBloodGroup < requestedQuantityOfBlood) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantityOfBloodGroup} ML of ${requestedBloodGroup.toUpperCase()} is available`
                });
            }

            req.body.hospital = user?._id;
        }
        else{
            req.body.donar = user?._id;
        }

        //save record

        const inventory = new inventoryModel(req.body);
        await inventory.save();

        return res.status(201).send({
            success: true,
            message: 'New Blood Record Added'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: "Error In Create Inventory API",
            error: error.message
        });
    }
};
// get all blood records

const getInventoryHospitalController = async (req, res) => {
    try {
        const inventories = await inventoryModel.find({ organisation: req.body.filters})
            .populate("donar")
            .populate("hospital")
            .populate("organisation")
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: "Get hospital records successfully",
            inventories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error In Get consumer  Inventory',
            error: error.message
        });
    }
}
// get hospital  blood records
const getInventoryController = async (req, res) => {
    try {
        const inventories = await inventoryModel.find({ organisation: req.body.userId })
            .populate("donar")
            .populate("hospital")
            .sort({ createdAt: -1 });

        return res.status(200).send({
            success: true,
            message: "Get all records successfully",
            inventories,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            success: false,
            message: 'Error In Get All Inventory',
            error: error.message
        });
    }
}
//get blood records of 3
const getRecentInventoryController = async (req,res) => {
    try{
        const inventory = await inventoryModel.find({
            organisation:req.body.userId
        }).limit(3).sort({createdAt: -1})
        return res.status(200).send({
            success:true,
            message:"recent inventory data",
            inventory,

        })



    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in fetch inventory api",
            error
        })

    }
}


//GET DONAR RECORDS
const getDonarsController = async (req, res) => {
    try{
        const organisation = req.body.userId;
        // find donars
        const donarId = await inventoryModel.distinct("donar",{
            organisation,
        });
        const donars = await userModel.find({_id: {$in: donarId}});
        return res.status(200).send({
            success:true,
            message:'Donar Record Fetched Successfully',
            donars,
        });
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Donar Records',
            error
        });
    }
};

const getHospitalController = async (req, res) => {
    try{
        const organisation = req.body.userId;
        // get hospital id
        const hospitalId = await inventoryModel.distinct('hospital',{organisation});
        // find hospital 
        const hospitals = await userModel.find({
            _id:{$in: hospitalId}
        });
        return res.status(200).send({
            success: true,
            message:"Hospitals Data Fetched Successfully",
            hospitals,
        });
    }catch (error) {
        console.log(error); 
        return res.status(500).send({
            success:false,
            message:'Error in get Hospital API',
            error
        });
    }
};

// get org profiles

const getOrganisationController = async (req, res) =>{
    try{
        const donar = req.body.userId;

        const orgId = await inventoryModel.distinct('organisation',{donar});
        const organisations=  await userModel.find({
            _id:{$in: orgId}
        });
        return res.status(200).send({
            success: true,
            message:"Org data fetched Successfully",
            organisations,
        });
        
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Organisation API',
            error
        });
    }
};

const getOrganisationForHospitalController = async (req, res) =>{
    try{
        const hospital = req.body.userId;

        const orgId = await inventoryModel.distinct('organisation',{donar});
        const organisations=  await userModel.find({
            _id:{$in: orgId}
        });
        return res.status(200).send({
            success: true,
            message:"Hospital data fetched Successfully",
            organisations,
        });
        
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Hospital API',
            error
        });
    }
};

module.exports = { 
    createInventoryController, 
    getInventoryController,
    getDonarsController,
    getHospitalController,
    getOrganisationController,
    getOrganisationForHospitalController ,
    getInventoryHospitalController,
    getRecentInventoryController
};
