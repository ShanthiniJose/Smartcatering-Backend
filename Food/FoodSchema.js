const mongoose=require('mongoose')

const food=new mongoose.Schema({
     
    catid:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:'Caterier'
    },
    foodName:{
        type:String,
        require:true
    },
    VegorNon:{
        type:String,
        require:true
    },
    package:{
        type:String,
        require:true
    },
    dessart:{
        type:String,
        require:true
    },
    price:{
        type:Number,require:true
    },
    discription:{
        type:String,
        require:true
    },
    images:{
        type:Object,
        require:true
    }
})

module.exports=new mongoose.model('Food',food)