const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const userschema = new mongoose.Schema(
    {
        // First Full name of the user
        fullname: {
            // First name
            firstname: {
                type: String,
                required: true,
                trim: true,
                minlength: [1, 'First name must be at least 1 character long'],
                maxlength: [50, 'First name cannot be more than 50 characters long'],
            },
            // Last name
            lastname: {
                type: String,
                trim: true,
                minlength: [1, 'First name must be at least 1 character long'],
                maxlength: [50, 'First name cannot be more than 50 characters long'],
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        },
        password: {
            type: String,
            required: true,
            minlength: [6, 'Password must be at least 6 characters long'],
            validate: [validatePassword, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'],
            trim: true,
            select: false
        },
        // Socket ID of the user used for live tracking
        socketId: {
            type: String
        }
    }
)

// Token Generation
userSchema.methods.genrateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY);
    return token;
}

// hashing
userSchema.methods.comparePassword = async function (password) {
   return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword= async function(password){
return await bcrypt.hash(password,10)
}

const userModel=mongoose.model('user',userSchema)
module.exports=userModel;



