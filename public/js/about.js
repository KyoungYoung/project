let movie_id = location.pathname;


// fetch를 이용하여 외부 api 가져오기
// 영화 세부 정보 가져오기

fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}) + kor)
.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

const setupMovieInfo = (data) => {
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const des = document.querySelector('.des');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');
    const movieReview = document.querySelector('.movie-review');
    // const otts = document.querySelector('.otts');
    // const actor = document.querySelector('.starting');

    //제목
    title.innerHTML = movieName.innerHTML = data.title;
    //개봉년도 및 장르
    genres.innerHTML = `${data.release_date.split('-')[0]} / `;
    for(let i = 0; i < data.genres.length; i++){
        genres.innerHTML += data.genres[i].name + formatString(i, data.genres.length);
    }
    
    // 성인
    if(data.adult == true){
        genres.innerHTML += ' / +18';
    }
    
    if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }
    // 줄거리
    des.innerHTML = `<p>개요</p>${data.overview.substring(0,400)} `;
    // 영화 원본 사진 갖고오기
    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}
// 삼항 연산자 이용 , 생기게하기
const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' :', ';
}

// ott 플랫폼 
fetch(`${movie_detail_http}${movie_id}/watch/providers?` + new URLSearchParams({
    api_key: api_key
}) + kor)
.then(res => res.json())
.then(data => {
    console.log(data.results.KR);
    const ott = document.querySelector('.otts');
    const watch = document.querySelector('.ottStream');
    const buy = document.querySelector('.ottBuy');
    const rent = document.querySelector('.ottRent');

    // KR 한국 찾아서 스트리밍,구매,렌트할 수 있는 플랫폼 찾아서 변수에 할당 
    let ottWatch = data.results.KR.flatrate;
    let ottBuy = data.results.KR.buy;
    let ottRent = data.results.KR.rent;

    if(ottWatch != null){
        watch.innerHTML += `스트리밍 : `
    }
    for(i in ottWatch){
        let ottLogoStream = ottWatch[i].logo_path;
        watch.innerHTML += `<div class="ottStream"><img src="${original_img_url}${ottLogoStream}"></div>`
    }

    if(ottBuy != null){
        buy.innerHTML += `구매 : `
    }
    for(j in ottBuy){
        let ottLogoBuy = ottBuy[j].logo_path;
        buy.innerHTML += ` <div class="ottBuy"><img src="${original_img_url}${ottLogoBuy}"></div>`
    }

    if(ottRent != null){
        rent.innerHTML += `대여 : `
    }
    for(k in ottRent){
        let ottLogoRent = ottRent[k].logo_path;
        rent.innerHTML += `<div class="ottRent"><img src="${original_img_url}${ottLogoRent}"</div>`
    }
})

// 출연진
fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
    api_key: api_key,
    page: Math.floor(Math.random() * 2) + 1
}) + kor)
.then(res => res.json())
.then(data => {
    console.log(data.cast);
    const cast = document.querySelector('.starting');
    for(let i = 0; i < 10; i++){
        let castImage = data.cast[i].profile_path
        let castName = data.cast[i].name 
        cast.innerHTML += `<div class="castImg">
        <img src="${original_img_url}${castImage}"><span>${castName}</span>
        </div>`
    }

})


// 예고편
fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => {
    let trailerContainer = document.querySelector('.trailer-container');
    
    // 최대 클립은 4개로 정하는 조건
    let maxClips = (data.results.length > 4) ? 4 : data.results.length;
    
    for(let i = 0; i < maxClips; i++){
        trailerContainer.innerHTML += `
        <iframe src="https://youtube.com/embed/${data.results[i].key}" title="YouTube video player" frameborder="0" allow="accelerometer; 
        autoplay; clipboard-write; encrypted-media; gyroscope; 
        picture-in-picture" allowfullscreen></iframe>
        `;
    }
})

//리뷰
// fetch(`${movie_detail_http}${movie_id}/review?` + new URLSearchParams({
//     api_key:api_key
// }))
// .then(res => res.json())
// .then(data => {
//     console.log(data);
//     let movieReview = document.querySelector('.movie-review');
// })

// 추천
fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key:api_key
}) + kor)
.then(res => res.json())
.then(data => {
    let container = document.querySelector('.recommendations-container');
    
    // 추천 영화 개수
    for(let i = 0; i < 12; i++){
        if(data.results[i].backdrop_path == null){
            i++;
        }
        container.innerHTML += `
        <div class="movie" onclick="location.href = '/${data.results[i].id}'">
            <img src="${img_url}${data.results[i].backdrop_path}" alt="">
            <p class="movie-title">${data.results[i].title}</p>
        </div>
        `
    }
})