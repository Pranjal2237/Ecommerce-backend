//Creating Token and Saving in Cookie


const sendToken=(user,statusCode,res)=>{


    const token=user.getJWTToken();

    //options for cookie
    const options={
        expires:new Date(
            Date.now()+24*60*60*1000*7
        ),
        httpOnly:true,
        sameSite:'none',
        secure:true
    }

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        token,
        user
    })
}

module.exports=sendToken;