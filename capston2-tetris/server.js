const express = require('express');
const app = express();
const port = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extends : true}));
app.set('view engine', 'ejs');
// mongoDB 연결
let db;
const MongoClient = require('mongodb').MongoClient;


MongoClient.connect('mongodb+srv://admin:admin1234@cluster0.5tqish3.mongodb.net/?retryWrites=true&w=majority',
(err,client)=>{
    if(err) return console.log(err);
    db = client.db('game');
    
    
    app.listen(port,()=>{
        console.log(`http://localhost:${port}`);
    });
})

// 데이터 전송
app.post('/add',(req,res)=>{
    res.send('전송완료')
    db.collection('counter').findOne({name: '게시물갯수'},(err,result)=>{
        console.log(result.totalPost);
        let totalCount = result.totalPost;
        
        db.collection('post').insertOne({_id : totalCount + 1, name: req.body.nickname, point: req.body.gamePoint},(err,result)=>{
            console.log('저장완료');
            db.collection('counter').updateOne({name: '게시물갯수'},{$inc: {totalPost:1}}, (err,result)=>{
                if(err){return console.log(err);}
            })
        });


    });
});
// 전송 받은 데이터 보여주기
app.get('/list',(req,res)=>{
    // 모든 데이터 보여주기
    db.collection('post').find().toArray((err,result)=>{
        console.log(result);
        res.render('list.ejs',{posts : result});
    });
});

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html')
});
app.get('/write',(req,res)=>{
    res.sendFile(__dirname + '/write.html')
});

// 삭제
app.delete('/delete',(req,res) => {
    console.log(req.body);
    req.body._id = parseInt(req.body._id);

    db.collection('post').deleteOne(req.body,(err,result) => {
        console.log('삭제완료');
        res.status(200).send('성공했습니다.');
    })
})

app.get('/detail/:id',(req,res) => {
    db.collection('post').findOne({_id : parseInt(req.params.id)},(err,result)=>{
        console.log(result);
        res.render('detail.ejs',{ data : result})
    })
})

app.use('/public',express.static('public'));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

app.use(session({secret:'code', resave : true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

