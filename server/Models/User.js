const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltlength = 10;
const jwt = require('jsonwebtoken');


const userSchema = mongoose.Schema({
    name : {
        type : String,
        maxlength : 50,
        trim : true,
        unique : 1
    },
    email : {
        type : String,
        trim : true,
        unique : 1
    },
    password : {
        type : String,
        minlength : -5,
    },
    role : {
        type : Number,
        default : 0,
    },
    image : String,
    token :{
        type : String,
    },
    tokenExp : {
        type : Number
    }
});

userSchema.pre('save', function(next) {
    var user = this;
    //isModified : mongoDB에 해당 데이터가 변경되는지 확인하는 조건문
    //변경되었다면, True, 바뀌지 않았다면 false를 반납
    if(user.isModified('password')){
        bcrypt.genSalt(saltlength, function (err, salt) {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err);
                user.password = hash;
                next();
            })
            
        })
    }else {
        next();
    }
})

userSchema.methods.comparePassword = function(plainpassword, cb) {
    bcrypt.compare(plainpassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}
userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user);
    })
}

userSchema.statics.findbyToken = function(token, cb) {
    var user = this;

    //토큰을 decord 한다.
    jwt.verify(token, 'secretToken', function(err, decoded) {
        //유저 아이디를 이용하여, 유저를 찾아서 클라이언트에서 가져온 (디코드 사용자)토큰과
        //DB내 저장된 토큰 정보가 일치하는지 확인
        user.findOne({"_id" : decoded, "token" : token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);
module.exports = { User };