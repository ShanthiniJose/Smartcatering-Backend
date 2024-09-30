const mongoose=require('mongoose')
const caterier=new mongoose.Schema({
    
    name:{
        type:String,require:true
    },
    district:{
        type:String,require:true
    },
    pincode:{
        type:Number,
        require:true
    },
    contact:{
        type:Number,
        require:true
    },
    city:{
        type:String,require:true
    },
    email:{
        type:String,require:true
    },
    password:{
        type:String,require:true
    },
    regno:{
        type:Number,
        require:true
    }
})

module.exports=new mongoose.model('Caterier',caterier)