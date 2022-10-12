let movie_id = location.pathname;


// 영화 세부 정보 가져오기

fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))
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
    des.innerHTML = data.overview.substring(0,200) + '...';
    // 영화 원본 사진 갖고오기
    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;
}
// 삼항 연산자 이용 , 생기게하기
const formatString = (currentIndex, maxIndex) => {
    return (currentIndex == maxIndex - 1) ? '' :', ';
}

// 출연진
// fetch를 이용하여 외부 api 가져오기
fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    const cast = document.querySelector('.starring');
    // 5명만 필요함
    for(let i = 0; i < 5; i++){
        cast.innerHTML += data.cast[i].name + formatString(i,5);
    }
})


// 예고편
fetch(`${movie_detail_http}${movie_id}/videos?` + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => {
    console.log(data);
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

// 추천
fetch(`${movie_detail_http}${movie_id}/recommendations?` + new URLSearchParams({
    api_key:api_key
}))
.then(res => res.json())
.then(data => {
    let container = document.querySelector('.recommendations-container');
    
    // 추천 영화 개수
    for(let i = 0; i < 19; i++){
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