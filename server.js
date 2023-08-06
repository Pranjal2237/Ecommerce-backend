const app=require('./app');
const connectDatabase=require('./database')
const Product=require("./models/productModel")
const {products}=require("./data/products")






//connecting database

connectDatabase();

app.listen(process.env.PORT,()=>{
    // Product.insertMany(products);
    console.log(`server is working on http://localhost:4000`);
});