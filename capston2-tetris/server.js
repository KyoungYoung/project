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
    res.sendFile(__dirname + '/Lobby.html')
    db.collection('counter').findOne({name: '게시물갯수'},(err,result)=>{
        console.log(result.totalPost);
        let totalCount = result.totalPost;
        
        db.collection('post').insertOne({_id : totalCount + 1, name: req.body.nickname, point: req.body.rankScore},(err,result)=>{
            console.log('저장완료');
            db.collection('counter').updateOne({name: '게시물갯수'},{$inc: {totalPost:1}}, (err,result)=>{
                if(err){return console.log(err);}
            })
        });


    });
});

app.use(express.static('public/css'));
app.use(express.static('public/img'));
app.use(express.static('public/js'));
app.use(express.static('public/audio_src'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/Lobby.html')
});
app.get('/1P-game',(req,res)=>{
    res.sendFile(__dirname + '/1Pindex.html')
});
app.get('/2P-game',(req,res)=>{
    res.sendFile(__dirname + '/2Pindex.html')
});
app.get('/write',(req,res)=>{
    res.sendFile(__dirname + '/write.html')
});

// 전송 받은 데이터 보여주기
app.get('/list',(req,res)=>{
    // 모든 데이터 보여주기
    db.collection('post').find().toArray((err,result)=>{
        result.sort((a,b)=>{ 
            return b.point - a.point
        }) 
        console.log(result);
        res.render('list.ejs',{posts : result});
    });
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



