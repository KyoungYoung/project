let movie_id = location.pathname;

// fetching movie details
fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key: api_key
}))
.then(res => res.json())
.then(data => {
    setupMovieInfo(data);
})

