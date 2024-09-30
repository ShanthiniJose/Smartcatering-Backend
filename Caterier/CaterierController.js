const caterier = require('./CaterierSchema')



const RegisterCaterier = (req, res) => {
   
    const { name,district,pincode,city,contact,email,password,regno} = req.body;
    const datas = new caterier({
        name,district,pincode,city,contact,email,password,regno
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

const LoginCaterier = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Use findOne to search by email instead of findById
        const user = await caterier.findOne({ email: email });
        
        if (!user) {
            return res.json({
                msg: "User not found",
                status: 400
            });
        }

        if (user.password !== password) {
            return res.json({
                msg: "Incorrect password",
                status: 401
            });
        }

        return res.json({
            msg: "Login successful",
            status: 200,
            data: user
        });
    } catch (err) {
        console.log(err);
        return res.json({
            msg: "An error occurred",
            status: 500,
            error: err
        });
    }
};



const EditCaterier=((req,res)=>{
    const id=req.params.id;
    const{name,district,pincode,city,contact,email,password,regno}=req.body
   caterier.findByIdAndUpdate(id,{name,district,pincode,city,contact,email,password,regno})
    .then((data)=>{
        res.json({
            status:200,
            Message:"data Update",
            data:data
        })
    })
    .catch((err)=>{
        res.json({
            status:400,
            Message:"not update"
        })
    })
})

const ViewCaterierById=((req,res)=>{
    const id=req.params.id;
    caterier.findById(id)
     .then((data)=>{
         res.json({
             status:200,
             Message:"data delete",
             data:data
         })
     })
     .catch((err)=>{
         res.json({
             status:400,
             Message:"not delete"
         })
     })
 })
const ViewAllCaterier=((req,res)=>{
    
   control.find()
    .caterier((data)=>{
        res.json({
            status:200,
            Message:"data delete",
            data:data
        })
    })
    .catch((err)=>{
        res.json({
            status:400,
            Message:"not delete"
        })
    })
})


 
const DeleteCaterier=((req,res)=>{
    const id=req.params.id;
    caterier.findByIdAndDelete(id)
    .then((data)=>{
        res.json({
            status:200,
            msg:"data delete"
        })
    })
    .catch((err)=>{
        res.json({
            status:400,
            msg:"not delete"
        })
    })
})
module.exports={RegisterCaterier,LoginCaterier,EditCaterier,ViewCaterierById,ViewAllCaterier,DeleteCaterier}
