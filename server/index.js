const express = require('express');
const app = express();
const port = 3003;
const mongoose = require('mongoose');
const { User } = require('./Models/User');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { auth }= require('./Middleware/auth');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

console.log('mongo : ' + process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongoDB Connected...')).catch(err => { console.log('Mongoose Error : ' + err) });


app.post('/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ Success: false, err });
        return res.status(200).json({
            register_Success: true,
        })
    });
})

app.post('/api/login', (req, res) => {
    //name으로 사용자 네임 찾기  
    User.findOne({ name: req.body.name }, (err, user) => {
        console.log(user);
        console.log(req.body.name);
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: '입력하신 이메일과 동일한 정보가 존재하지 않습니다.'
            })
        }
        //입력받은 비밀번호도 토큰으로 변경하여 일치하는지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: '비밀번호가 일치하지 않습니다.' });

            //로그인 성공 시 
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("loginid", user.token).status(200).json({ loginSuccess: true, userId: user._id })
            })
        })
    })
})

app.get('/logout', auth, (req, res) =>{
    User.findOneAndUpdate({_id : req.user._id},
        {token : ""}, (err, user) =>{
            if(err) return res.json({loginSuccess :false, err});
            return res.status(200).send({
                logout_Success : true
            })
        })
})

app.get('/api/hello', (req,res) =>{
    res.send('Example Success');
})



app.listen(port, () => console.log(`Sever Connecting... port : ${port}`));