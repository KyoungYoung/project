// 메인 페이지
// api key d516745898f6293a295ed20361b456e5
const main = document.querySelector('.main');

// html에서 home.js 앞에 api.js를 추가했어서 api 변수에 접근 가능
// URLSearchParams를 사용하여 링크 뒤에 매개변수 추가


// 장르
fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}) + kor)
.then(res => res.json())
.then(data => {
    console.log(data);
    data.genres.forEach((item) => {
        console.log(item);
        // 함수 생성
        fetchMoviesListByGenres(item.id, item.name);
    })
});

// 영화 장르별 
const fetchMoviesListByGenres = (id, genres) => {
    // 가져온 장르별 영화 정보 가져오기
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        // 여기에서 api_key를 사용하여 특정 장르의 영화를 가져오기 위해 다른 매개변수를 전달
        with_genres: id,
        // 페이지 수 Math객체를 이용해서 3 페이지 구현
        page: Math.floor(Math.random() * 3) + 1
    }) + kor)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // 함수 생성
        makeCategoryElement(`${genres}`, data.results);
    })
    .catch(err => console.log(err));
}

// 카테고리, 양 옆버튼
// .split("_")은 장르의 _를 삭제 .join(" ")은 그 자리에 공백 넣어줌
const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">

            <button class="pre-btn"><img src="image/right.png" alt=""></button>

            <h1 class="movie-category">${category.split("_").join(" ")}</h1>

            <div class="movie-container" id="${category}"></div>

            <button class="nxt-btn"><img src="image/left.png" alt=""></button>

        </div>
    `;
    makeCards(category, data);
}
// id값이 있는 영화 요소 선택
const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    // forEach 메서드 사용하여 data값 반복
    data.forEach((item, i) => {
        /*영화 데이터에서 영화 이미지가 포함된 'backdrop_path'가 있다. 어떤 경우에는 'backdrop_path' 대신 이미지에 대해 
        'poster_path'가 표시되고 어떤 경우에는 TMDB가 아무 것도 제공하지 않는다. 그래서 이미지를 얻고 있는지 상태를 확인해야한다.*/
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            // 루프에서 아무것도 반환하지 않으면.
            if(item.backdrop_path == null){
                return;
            }
        } 
        /* innerHTML에서는 =가 아니라 +=를 사용해야한다.
           이미지를 가져오기 위해 'img_url' key를 생성하고 여기에 해당 변수를 전달.*/
        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
                    <img src="${img_url}${item.backdrop_path}" alt="" >
                    <p class="movie-title">${item.title}</p>
                </div>
        `;

        // 슬라이더 생성, 이 조건은 모든 카드를 만들 때 다음 코드를 실행하는 것을 의미.
        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            },100);
        }
    })
}