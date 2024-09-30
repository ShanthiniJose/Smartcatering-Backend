const charity=require('./CharitySchema')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./Upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const Upload = multer({ storage: storage }).single("file");

const RegisterCharity = (req, res) => {
    const image=req.file
    const { name,district,pincode,city,contact,email,password,regno} = req.body;
    const datas = new charity({
        name,district,pincode,city,contact,email,password,regno,image
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

const LoginCharity = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await charity.findOne({ email: email });
        
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

const ViewcharityById=((req,res)=>{
    const id=req.params.id;
    charity.findById(id)
     .then((data)=>{
         res.json({
             status:200,
             Message:"data update",
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

 const EditCharity=((req,res)=>{
    const id=req.params.id;
    const image=req.file
    const{ name,district,pincode,city,contact,email,password,regno}=req.body
    charity.findByIdAndUpdate(id,{ name,district,pincode,city,contact,email,password,regno,image})
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

const ViewAllCharity=((req,res)=>{
        charity.find()
        .then((data)=>{
            res.json({
                status:200,
                data:data
            })
        })
        .catch((err)=>{
            res.json({
                status:400,
               
            })
        })
  
 })
 const DeleteCharity=((req,res)=>{
    const id=req.params.id;
    charity.findByIdAndDelete(id)
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

module.exports={RegisterCharity,LoginCharity,ViewcharityById,EditCharity,ViewAllCharity,DeleteCharity,Upload }

