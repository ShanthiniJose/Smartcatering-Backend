const express=require('express')
const route=express.Router();
const customer=require('./Customer/CustomerController')
const caterier=require('./Caterier/CaterierController')
const food=require('./Food/FoodController')
const order=require('./Order/OrderController')
const charity=require('./Charity/CharityController')
const complaint=require('./Complaint/ComplaintController')
const admin=require('./Admin')

route.post('/admin',admin.AdminLogin) //login admin

route.post('/regCus',customer.RegisterCustomer) //save()
route.post('/loginCus',customer.Login)     //FindOne()
route.post('/viewCusById/:id',customer.ViewCustomerById)  //findById()ViewcharityById
route.post('/editCus/:id',customer.EditCustomer)    //findByIdAndupdatete()
route.post('/delCus/:id',customer.DeleteCustomer)   //findByIdAndDelete()
route.post('/viewAllCus',customer.ViewAllCustomer)      //find()
route.post('/viewAllCat',customer.viewAllCatering )       //find()



route.post('/regCat',caterier.RegisterCaterier) //save()
route.post('/loginCat',caterier.LoginCaterier)     //FindOne()
route.post('/viewCatById/:id',caterier.ViewCaterierById) 
route.post('/editCat/:id',caterier.EditCaterier)    //findByIdAndupdatete()
route.post('/viewAllCat',caterier.ViewAllCaterier) 
route.post('/delCat/:id',caterier.DeleteCaterier)   //findByIdAndDelete()

//food

route.post('/addFood',food.Upload,food.AddFood) //save()
route.post('/viewFoodByCat/:id',food.viewFoodByCat)
route.post('/viewFood',food.viewAllFood) //View all()
route.post('/delFood/:id',food.DeleteFood)   //findByIdAndDelete()
route.post('/editFood/:id',food.Upload,food.EditFood)    //findByIdAndupdatete()
route.post('/viewfoodOne/:id',food.ViewFoodById)

//orders
route.post('/addOrder',order.addOrder)
route.post('/ViewOrder',order.Vieworders)
 
//cus order
route.get('/Viewpending/:id',order.viewPendingOrdersByCustId)  // find cusid pending
route.post('/ViewConfirmed/:id',order.viewConfirmedOrdersByCustId) //fetch data from if caterier approved the order
route.post('/Viewrejected/:id',order.viewRejectedOrdersByCustId)   // fetch data from if  caterier reject the order
route.post('/Viewshippeded/:id',order.viewshippedOrdersByCustId)   // fetch data from if  caterier reject the order
route.post('/ViewDeliver/:id',order.viewDeliveredOrdersByCustId)   // fetch data from if  caterier reject the order

//cater order
route.get('/ViewreqOrder/:id',order.viewPendingOrdersByCat)  //find catid pending 
route.post('/ApprovedCat/:id',order.approveOrderByCat) //button  When i click approvedCat button the status wiil change Approve --update
route.post('/RejectCat/:id',order.rejectOrderByCat)    //button    ,,
route.post('/ShipCat/:id',order.ShipOrderByCat)    //button    ,,
route.post('/deliverCat/:id',order.deliverOrderByCat)    //button    ,,....

route.post('/ViewApprovedCat/:id',order.viewAprvdOrdersByCat)  // 
route.post('/ViewshippedCat/:id',order.viewshippedOrdersByCat)  // 
route.post('/ViewdeliverCat/:id',order.viewDeliverOrdersByCat)  // .....

route.post('/regChar',charity.Upload,charity.RegisterCharity) //save()
route.post('/loginChar',charity.LoginCharity)     //FindOne()
route.post('/viewCharById/:id',charity.ViewcharityById) 
route.post('/editChar/:id',charity.Upload,charity.EditCharity)   
route.post('/viewAllChar',charity.ViewAllCharity )       //find()
route.post('/delChar/:id',charity.DeleteCharity)   //findByIdAndDelete()


route.post('/complaint',complaint.ViewCustomerComplaint) //save()
route.post('/Viewcomplaint',complaint.ViewCustomerComplaintByCat) //save()
route.post('/Viewcomplaintcus/:id',complaint.ViewCustomerComplaintByCus) //save()



module.exports=route;

