const express = require('express');
const app = express();
const port = 3000;

app.get('/',(req, res) => {
    res.send('현재 서버구축 연습중입니다.');
});

app.listen(port, () => {
    console.log('서버가 실행됩니다. http://localhost:${port}'); //터미널에 뜨는 내용
});

//lt --port 3000 --subdomain capston --print-requests