var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost:27017/catering');
const db=mongoose.connection;
db.on('error',console.error.bind(console,"connection error"))
db.once('open',function (){
console.log('connection successfully');
})

module.exports=db;

