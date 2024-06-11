const userModel = require("../models/userModel");
// get  donar list
const getDonarsListController = async(req,res) => {
    try{
        const donarData = await userModel.find({role :'donar'})
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:donarData.length,
            message:"Donar List Fetched Successfully",
            donarData,

        })


    }catch(error){

        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Donar list API',
            error

        })
    }
} ;
// get hospital list

const getHospitalListController = async(req,res) => {
    try{
        const hospitalData= await userModel.find({role :'donar'})
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:hospitalData.length,
            message:"Hospital List Fetched Successfully",
            hospitalData,

        })


    }catch(error){

        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Hospital list API',
            error

        })
    }
} ;
const getOrganisationListController = async(req,res) => {
    try{
        const orgData = await userModel.find({role :'organisation'})
        .sort({createdAt:-1});
        return res.status(200).send({
            success:true,
            TotalCount:orgData.length,
            message:"Organisation List Fetched Successfully",
            orgData,

        })


    }catch(error){

        console.log(error)
        return res.status(500).send({
            success:false,
            message:'Error in Organisation list API',
            error

        })
    }
} ;

const deleteDonarController = async (req,res) => {
    try{
        await userModel.fndByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'Donar Record Deleted Successfully'
        })


    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while deleting donar",
            error
        })

    }
};
/*const deleteHospitalController = async (req,res) => {
    try{
        await userModel.fndByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'hospital Record Deleted Successfully'
        })


    }catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error while deleting hospital",
            error
        })

    }
};*/

//export 
module.exports = {getDonarsListController,getHospitalListController,getOrganisationListController,deleteDonarController}
