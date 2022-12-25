const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = new  mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:25,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:25,
    },
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true,
    },
    email:{
        type: String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    hash_password:{
        type: String,
        required:true,
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default: 'user',
    },
    contactNumber:{type:String},
    profilePicture:{type:String}
}, {timestamps:true});

userSchema.virtual('password')
.set(function(password){
    this.hash_password = bcrypt.hashSync(password,10)
});
userSchema.method ={
    authenticate:function(pass){
        return bcrypt.compareSync(pass, this.hash_password)
    }
}

module.exports = mongoose.model('User',userSchema);