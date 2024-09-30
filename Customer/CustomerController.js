const customer = require('./CustomerSchema')
const caterier=require('../Caterier/CaterierSchema')



const RegisterCustomer = (req, res) => {
    const { name,district,pincode,city,contact,email,password,age} = req.body;
    const datas = new customer({
        name,district,pincode,city,contact,email,password,age
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

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await customer.findOne({ email: email });
        
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

const DeleteCustomer=((req,res)=>{
    const id=req.params.id;
   customer.findByIdAndDelete(id)
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

const EditCustomer=((req,res)=>{
    const id=req.params.id;
    const images=req.file
    const{name,district,pincode,city,contact,email,password,age}=req.body
    customer.findByIdAndUpdate(id,{name,district,pincode,city,contact,email,password,age})
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


const viewAllCatering = (req, res) => {
    caterier.find()
      .then((data) => {
          res.json({
            status: 200,
            msg: "Data obtained successfully",
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
const ViewAllCustomer=((req,res)=>{
    
    customer.find()
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

const ViewCustomerById=((req,res)=>{
    const id=req.params.id;
    customer.findById(id)
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
module.exports = { RegisterCustomer,Login,DeleteCustomer,EditCustomer,ViewAllCustomer,ViewCustomerById,viewAllCatering}
