const { Promise } = require("mongoose");
const inventoryModel = require("../models/inventoryModel");

// get blood data
const bloodGroupDetailsController = async (req, res) => {
    try {
        const bloodGroups = ['0+', 'O-', 'AB+', 'AB-', 'A+', 'A-', 'B+', 'B-'];
        const bloodGroupData = [];
        const organisation = req.body.userId;

        // Get data for each blood group
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            // Count total in
            const totalIn = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'in',
                        organisation: mongoose.Types.ObjectId(organisation) // Convert organisation to ObjectId
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            // Count total out
            const totalOut = await inventoryModel.aggregate([
                {
                    $match: {
                        bloodGroup: bloodGroup,
                        inventoryType: 'out',
                        organisation: mongoose.Types.ObjectId(organisation) // Convert organisation to ObjectId
                    }
                },
                {
                    $group: {
                        _id: null,
                        total: { $sum: '$quantity' }
                    }
                }
            ]);

            // Calculate available blood
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0);

            // Push data to bloodGroupData array
            bloodGroupData.push({
                bloodGroup: bloodGroup,
                totalIn: totalIn[0]?.total || 0,
                totalOut: totalOut[0]?.total || 0,
                availableBlood: availableBlood
            });
        }));

        return res.status(200).send({
            success: true,
            message: "Blood Group Data Fetched Successfully",
            bloodGroupData: bloodGroupData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error In BloodGroup Data Analytics API",
            error: error.message
        });
    }
};

module.exports = { bloodGroupDetailsController };
