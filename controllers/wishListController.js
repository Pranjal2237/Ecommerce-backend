const Product=require('../models/productModel');
const WishList=require('../models/wishListModel');
const User=require('../models/userModel')
const ErrorHandler=require('../utils/errorHandler');

//Create New WishList-Product

exports.newWishList=async(req,res,next)=>{

    const product= await Product.findById(req.params.id);

    const wishListProduct={
        product_id:req.params.id,
        name:product.name,
        price:product.price,
        rating:product.rating,
        images:product.images
    }


    const wishList=await WishList.create({wishListProduct,user:req.user._id})

    res.status(201).json({
        success:true,
        wishList
    })
}

//Get all logged in user wishListProducts

exports.getWishListProducts=async(req,res,next)=>{


    const products=await WishList.find({user:req.user._id});

    if(!products)
    {
        next(new ErrorHandler("No wishList-Product Found",400))
    }
    res.status(200).json({
        success:true,
        products
    })
}

// Remove WishList-Product

exports.removeWishListProduct=async(req,res,next)=>{

    const product=await WishList.findById(req.params.id)

    if(!product)
    {
        next(new ErrorHandler("No Product Found",404))
    }

    await WishList.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success:true,
        message:'Product removed from wishList'
    })
}