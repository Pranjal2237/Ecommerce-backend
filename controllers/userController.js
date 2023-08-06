const User=require('../models/userModel');
const ErrorHandler=require('../utils/errorHandler');
const bcrypt=require('bcrypt')
const sendToken=require('../utils/jwtToken');
const Product=require('../models/productModel')
const {request}=require('express');

//Ragister a User

exports.createUser=async(req,res,next)=>{
    try{
    const user=await User.create(req.body);
    sendToken(user,201,res);
    }catch(error){
        console.log(error);
    }
}

//Login User

exports.loginUser=async(req,res,next)=>{
    const check=await User.findOne({email:req.body.email}).select('+password');
    
    if(!check)
    {
        return next(new ErrorHandler("Invalid Email",401));
    }
    const checkPassword=await bcrypt.compare(req.body.password,check.password);
    if(!checkPassword)
    {
        return next(new ErrorHandler("Invalid Password",400));
    }

    sendToken(check,200,res);
}

//Logout user

exports.logout=async(req,res,next)=>{


    const options={
        expires:new Date(Date.now()),
        httpOnly:true
    }

    res.status(200).cookie('token',null,options).json({
        success:true,
        message:"Logged Out Successfully"
    })
}

//Get User Details

exports.userDetails=async(req,res,next)=>{

    const user=await User.findById(req.user.id);

    if(!user)
    {
        return next(new ErrorHandler("User not Found",401));
    }

    res.status(200).json({
        success:true,
        user
    })

}


//Update User Password

exports.updatePassowrd=async(req,res,next)=>{

    const user=await User.findById(req.user.id).select("+password");

    const check=bcrypt.compare(req.body.oldPassword,user.password);

    if(!check)
    {
        next(new ErrorHandler("Please Enter Valid Password",400));
    }

    if(req.body.newPassword!=req.body.confirmPassword)
    {
        next(new ErrorHandler("Password dose not match",400))
    }

    user.password=req.body.newPassword;
    await user.save();

    sendToken(user,200,res);
}


//Update Profile

exports.updateProfile=async(req,res,next)=>{

    const user=await User.findById(req.user.id).select('+password');

    const check=bcrypt.compare(req.body.password,user.password);

    if(!check)
    {
        return next(new ErrorHandler("Invalid Entered Password",400));
    }

    delete req.body['password'];

    await User.findByIdAndUpdate(req.user.id,req.body);

    sendToken(user,200,res);
}

//Update User Role--Admin

exports.updateUserRole=async(req,res,next)=>{

    const user=await User.findOne({email:req.body.email});

    if(!user)
    {
        next(new ErrorHandler("User dose not Exist",400));
    }

    await User.findByIdAndUpdate(user._id,req.body);

    res.status(200).json({
        success:true,
        user
    })

}

//Delete User

exports.deleteUser=async(req,res,next)=>{

    const user=await User.findById(req.params.id);

    if(!user)
    {
        return next(new ErrorHandler("User Not Found",400));
    }
    
    user.remove();

    res.status(200).json({
        success:true,
        message:"User Successfully deleted"
    })
}

//Create and Update New Cart

exports.newCart=async(req,res,next)=>{

    const product=await Product.findById(req.params.id)

    if(!product)
    {
        next(new ErrorHandler("No Product Found",400))
    }

    const cartItem={
        product_id:req.params.id,
        name:product.name,
        price:Number(product.price),
        images:product.images,
        quantity:Number(req.body.quantity)
    }

    const user=await User.findById(req.user._id);

        let isProduct=false;
        user.cartItems.forEach((key)=>{
            if(cartItem.product_id.toString()===key.product_id.toString())
            {
                isProduct=true;
            }
        })
        if(isProduct)
        {
            user.cartItems.forEach((key)=>{
                if(cartItem.product_id.toString()===key.product_id.toString())
                {
                    key.quantity=cartItem.quantity;
                }
            })
        }
        else
        {
            user.cartItems.push(cartItem);
        }

        await user.save();


    res.status(201).json({
        success:true,
        user
    })
}

//Delelte Cart Product

exports.deleteCart=async(req,res,next)=>{

    const user=await User.findById(req.user._id);

    if(!user)
    {
       return next(new ErrorHandler("No User Found",400))
    }


    user.cartItems=user.cartItems.filter((key)=>{return key._id.toString()!=req.params.id.toString()})

    await user.save();

    res.status(200).json({
        success:true,
        message:'Product Removed from Cart Successfully',
        user
    })
}