let movie_id = location.pathname;

// 작업중
fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

