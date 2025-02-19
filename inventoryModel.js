const mongoose = require ('mongoose')

const inventorySchema = new mongoose.Schema({
    inventoryType:{
        type:String,
        required:[true, 'inventory type require'],
        enum:['in','out']
    },
    bloodGroup:{
        type:String,
        required:[true, 'blood group is required'],
        enum:['0+', 'O-','AB+','AB-','A+','A-','B+','B-']
    },
    quantity:{
        type:Number,
        require:[true,'blood quantity is required']
    },
    donarEmail: {
        type:String,
        required:[true,"Donar Email is Required"]
    },
    organisation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,'organisation is require']
    },
    hospital:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:function(){
            return this.inventoryType === "out";
        }
    },
    donar:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        //required:function(){
           // return this .inventoryType === "in";
        //},
    },
},
{timestamps:true}



    
);

module.exports= mongoose.model('inventories',inventorySchema);