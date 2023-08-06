const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please Enter Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minlength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    avtar:{
            public_id:{
                type:String,
                required:false
            },
            url:{
                type:String,
                required:false
            }        
    },
    cartItems:[
        {
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
            ],
            quantity:{
                type:Number,
                required:true
            }
        }
    ],
    role:{
        type:String,
        default:"user"
    },

    resetPasswordToken:String,
    resetPasswordDate:Date
})

userSchema.pre("save",async function(next){
    if(!this.isModified('password'))
    {
        next();
    }
    this.password=await bcrypt.hash(this.password,10);
});


//JWT Token

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},'jguuktyfjhjhjghgukyfyyfdjgjjktdyhg')
}


module.exports=mongoose.model("User",userSchema);