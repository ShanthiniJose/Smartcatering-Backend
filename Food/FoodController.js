const food = require('./FoodSchema')
const caterier=require('../Caterier/CaterierSchema')
const multer=require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const Upload = multer({ storage: storage }).single("file");


const AddFood = (req, res) => {
    const images=req.file
    const {foodName,VegorNon,package,dessart,price,discription, catid} = req.body;
    const datas = new food({
        foodName,VegorNon,package,dessart,price,discription,catid,images
    })
    datas.save()
    .then((data) => {
        res.json({
            status: 200,
            msg: "Inserted successfully",
            data: data,
        });
    })
    .catch((err) => {
        console.log(err);
        res.json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
        });
    });
}
const viewAllFood = (req, res) => {
    food.find()
      .then((data) => {
          res.json({
            status: 200,
            data: data,
          });
        } 
      )
      .catch((err) => {
        res.json({
          status: 500,
          msg: "Data not Inserted",
          Error: err,
        });
      });
  };

  const DeleteFood=((req,res)=>{
    const id=req.params.id;
     food.findByIdAndDelete(id)
    .then((data)=>{
        res.json({
            status:200,
            data:data,
            msg:"data delete"
        })
    })
    .catch((err)=>{
        res.json({
            status:400,
            error:err,
           
        })
    })
})

const EditFood=((req,res)=>{
    const id=req.params.id;
    const images=req.file
    const{foodName,VegorNon,package,dessart,price,discription}=req.body
    food.findByIdAndUpdate(id,{foodName,VegorNon,package,dessart,price,discription,images})
    .then((data)=>{
        res.json({
            status:200,
            msg:"data Update",
            data:data
        })
    })
    .catch((err)=>{
        res.json({
            status:400,
            msg:"not update",
            error:err
        })
    })
})

const ViewFoodById=((req,res)=>{
    const id=req.params.id;
    food.findById(id)
     .then((data)=>{
         res.json({
             status:200,
             data:data
         })
     })
     .catch((err)=>{
         res.json({
             status:400,
             error:err
         })
     })
 })

 const viewFoodByCat = (req, res) => {
    food.find({ catid: req.params.id })
      .then((data) => {
        // console.log(data);
        if (data) {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.json({
            status: 200,
            msg: "No Data obtained ",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: 500,
          msg: "something went wrong",
          Error: err,
        });
      });
  };
module.exports={AddFood,viewAllFood,DeleteFood,EditFood,ViewFoodById,Upload,viewFoodByCat}