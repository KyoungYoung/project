const express = require('express');
const fs = require('fs');
const app = express();

// 포트 번호 
const port = 3000;


// 서버 만들기
app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`); //터미널에 뜨는 내용
});

// 새 터미널에 입력해주면 외부에서 서버 연결 가능(lt --port 3000 --subdomain otts --print-requests)

// html 연결 및 이미지 가져오기
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.use('/',(req, res) => {
    fs.readFile('./asset/image/Top-Gun.jpeg', (err, data) =>{
        res.writeHead(200);
        res.write(data);
        res.end();
    });
});

app.get('/search',(req,res) => {
    res.send('서브 페이지 테스트입니다.');
});
