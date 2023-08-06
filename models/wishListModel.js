const mongoose=require('mongoose')
const express=require('express')

const wishListSchema=new mongoose.Schema({
    wishListProduct:{
        product_id:{
            type:mongoose.Schema.ObjectId,
            ref:'Product',
            required:true
        },
        name:{
            type:String,
            required:[true,"please Enter Product Name"],
            trim:true
        },
        price:{
            type:Number,
            required:[true,"please Enter Product Price"]
        },
        rating:{
            type:Number,
            default:0
        },
        images:[
            {
                public_id:{
                    type:String,
                    required:true
                },
                url:{
                    type:String,
                    required:true
                }
            }
        ]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports=mongoose.model('WishList',wishListSchema);