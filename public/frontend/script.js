$(function (){
    
});

const loadMovieData = e => {
    let mediaType = $('#media-select').val();
    let query = $(e).val();
    if (query.length < 3)
        return false;
    let url= '';
    switch (mediaType) {
        case "1":
            url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`;
            break;
        case "2":
            url = `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`;
            break;
        default:
            console.log('default');
    }

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzU2YTNmOTk4MWMzMjRmMDE3MDI5MTY4MmUwNzQ2ZSIsInN1YiI6IjYzMzBiMWRlYTVkODQ5MDA5MjU1OTY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyrNPvyjIohhS-gGcJxBJbfAar6xJNMljeJOkU35NkU'
        }
      };
      
      fetch(url, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}