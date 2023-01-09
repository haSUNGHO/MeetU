const { User } = require('../Models/User');

let auth = (req, res, next) => {
 //인증 처리 하기 위한 공간

        //1. 클라이언트에서 쿠키 토큰을 가져와야함.
        let token = req.cookies.loginid;
        //2. 토큰을 decording(복호화)하여 유저 정보 확인
        User.findbyToken(token, (err, user) =>{
            if(err) throw err;
            if(!user){
                console.log(err);
                return res.json({isAuth : false, error : true, err})
            }
            req.token = token;
            req.user = user;
            next();
        });
        //3. 유저가 존재하면, yes, 없으면? no
}

module.exports = {auth};