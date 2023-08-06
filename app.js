const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv')
const {fileURLToPath}=require('url')
const path=require('path')
const multer=require('multer')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const product=require('./routes/productRoute');
const user=require('./routes/userRoute');
const order=require('./routes/orderRoute');
const wishList=require('./routes/wishListRoute')
const errorMiddleWare=require('./middleware/error')

dotenv.config();
const app=express();
app.use(express.json());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));

app.use(cookieParser());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

console.log(express.request.body);

//Route Imports

app.use('/app/v1',product);
app.use('/app/v1',user);
app.use('/app/v1',order);
app.use('/app/v1',wishList);

//MiddleWare for Errors

app.use(errorMiddleWare);

module.exports=app;