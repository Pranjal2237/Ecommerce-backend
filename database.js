const mongoose=require('mongoose');

const connectDatabase=()=>{
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then((data)=>{
        console.log(`Mongodb is connected with server:${process.env.PORT}`)
    }).catch((err)=>{
        console.log(err.message);
    })
}


module.exports=connectDatabase