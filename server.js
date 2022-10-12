const express = require('express');

// 파일 경로를 추적하기 위해 path library가 필요함
const path = require('path');

// 공개 폴더 경로를 저장합니다.
let initial_path = path.join(__dirname, 'public');

let app = express();
// public 폴더를 정적 경로를 만들기 위해 static 메서드 사용
app.use(express.static(initial_path));

// 포트 번호 
const port = 3000;

// 메인 페이지 서버
app.get('/',(req, res) => {
    res.sendFile(path.join(initial_path, 'index.html'));
})
// about.js 연결
app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path,'about.html'));
})

// 페이지가 다를 때 404
app.use((req,res) => {
    res.json('404');
})


// 서버 실행 콘솔 창에 보이기
app.listen(port, () => {
    console.log(`서버가 실행됩니다. http://localhost:${port}`); //터미널에 뜨는 내용
});

// 새 터미널에 입력해주면 외부에서 서버 연결 가능(lt --port 3000 --subdomain otts --print-requests)


