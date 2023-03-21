const express = require('express');
const app = express();
const port = 3003;
const mongoose = require('mongoose');
const { User } = require('./Models/User');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const { auth }= require('./Middleware/auth');
const { Location } = require('./Models/Location');
const { Stores } = require('./Models/Stores');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

console.log('mongo : ' + process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('mongoDB Connected Success')).catch(err => { console.log('Mongoose Error : ' + err) });

//가게 정보 저장하기
app.post('/api/createstore', (req, res) => {
    let createstore = new Stores(req.body);
    createstore.save((err)=> {
        if(err) return res.json({Storeinsert : false, 
                                 ErrorMSg : err});
        return res.status(200).json({Storeinsert : true});
    })
})

//해당지역 가게정보 출력
app.post('/api/store', (req,res) => {
    console.log(req.body.addr)
    Stores.find({address : "/"+req.body.addr + "/"}, (err, stores) =>{
        if(err) res.status(400).json({errMSg : err});
        res.status(200).json(stores)
    })
})

//location 추가 mongoose
app.post('/api/map', (req, res) => {
    const location = new Location(req.body)
    location.save((err) => {
        if(err) return res.json({ mapResponse : false});
        return res.status(200).json({
            mapResponse : true
        })
    })
})
//location 정보 변경 mongoose
app.post('/api/map/change', (req, res)=> {
    
    let name = Location.findOneAndUpdate(req.body.country, req.body, (err)=> {
        if(err) res.status(500).json({err});
        else res.status(200).json({Update_Success : true});
    })
})

//req : locationnum : 지역번호 -> res : 지역번호 정보 모두
app.post('/api/map/city', (req, res)=> {
    Location.find({ city : req.body.locationnum }, 'country x y', (err, country)=>{
        if(err)console.log("findCityErr : "+ err);
        if(!country || country === "") {
            return res.status(504).json({countryRes : false});
        }
        console.log(country)
        res.status(200).json(JSON.stringify(country));
    })
})

app.post('/api/register', (req, res) => {
    const user = new User(req.body)

    user.save((err, userInfo) => {
        if (err) return res.json({ registerSuccess: false, err });
        return res.status(200).json({
            registerSuccess: true,
        })
    });
})

app.post('/api/login', (req, res) => {
    //name으로 사용자 네임 찾기  
    User.findOne({ name: req.body.name }, (err, user) => {
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

app.get('/api/logout', auth, (req, res) =>{
    console.log('logout req : ' + req);
    User.findOneAndUpdate({_id : req.user._id},
        {token : ""}, (err, user) =>{
            console.log(user);
            if(err) return res.json({loginSuccess :false, err});
            return res.status(200).send({
                logoutSuccess : true
            })
        })
})

app.get('/api/hello', (req,res) =>{
    res.send('Example Success');
})
//auth를 통한 사용자 구분 페이지 설정
app.get('/api/auth', auth, (req, res) => {
    console.log('Auth Request Success' + ', _id : ' + req.user._id)
    res.status(200).json({
        _id : req.user._id,
        isAuth : true,
        role: req.user.role,
        name : req.user.name,
        email : req.user.email
    })
})

app.listen(port, () => console.log(`Sever Connecting... port : ${port}`));