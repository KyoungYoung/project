// 메인 페이지
// api key d516745898f6293a295ed20361b456e5
const main = document.querySelector('.main');
// html에서 home.js 앞에 api.js를 추가했어서 api 변수에 접근 가능
fetch(genres_list_http + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    data.genres.forEach(item => {
        fetchMoviesListByGenres(item.id, item.name);
    })
});

const fetchMoviesListByGenres = (id, genres) => {
    fetch(movie_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: id,
        // 3 page
        page: Math.floor(Math.random() * 3) + 1
    }))
    .then(res => res.json())
    .then(data => {
        makeCategoryElement(`${genres}_movies`, data.results);
    })
    .catch(err => console.log(err));
}

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
const makeCards = (id, data) => {
    const movieContainer = document.getElementById(id);
    data.forEach((item, i) => {
        if(item.backdrop_path == null){
            item.backdrop_path = item.poster_path;
            if(item.backdrop_path == null){
                return;
            }
        } 

        movieContainer.innerHTML += `
        <div class="movie" onclick="location.href = '/${item.id}'">
                    <img src="${img_url}${item.backdrop_path}" alt="" >
                    <p class="movie-title">${item.title}</p>
                </div>
        `;

        if(i == data.length - 1){
            setTimeout(() => {
                setupScrolling();
            },100);
        }
    })
}