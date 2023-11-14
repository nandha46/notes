// import config from '../config';

var movArr = [];
var tvArr = [];

// let tmdb_bearer_token = config.get('tmdb_bearer_token');

$(function(){
    $('#download-list-form').on('submit', ()=>{

        let data = {
            'mediaType': $('#media-select').val(),
            'selectedTitle': $('#movie-select').val(),
            'adult': $('#customSwitch1').is(':checked'),
            'priority': $('#priority')[0].noUiSlider.get(),
            'url': $('#url').val(),
            'comment': $('#comment').val(),
            'movArr': movArr,
            'tvArr': tvArr
        };

        $.ajax({
            url: '/add-to-download-list', 
            type:'post',
            data: JSON.stringify(data), 
            contentType: "application/json"
        }).done(function(result){
            if(result.status){
                Swal.fire("Good job!", "Added to watchlist!", "success");
            } else {
                Swal.fire(`${result.message}!`, "", "error");
            }
        }).fail(function (xhr, status, error){
            Swal.fire(`Error!`, "Check the console for more..", "error");            
            console.log("Error:", error);
        });
        return false;
    });
})

const loadMovieData = e => {
    let mediaType = $('#media-select').val();
    let query = $(e).val();
    if (query.length < 3)
        return false;
    let url= '';

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzU2YTNmOTk4MWMzMjRmMDE3MDI5MTY4MmUwNzQ2ZSIsInN1YiI6IjYzMzBiMWRlYTVkODQ5MDA5MjU1OTY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyrNPvyjIohhS-gGcJxBJbfAar6xJNMljeJOkU35NkU'
        }
      };

    switch (mediaType) {
        case "1":
            fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`, options)
        .then(response => {
            { 
                let data = response.json();
                $('#movie-select').empty().trigger("change");
                data.then(data => {
                 if(data.results){
                    let results = data.results;
                    movArr = [...movArr, ...results];
                     for (const item of results){
                         var newOption = new Option(item.title, item.id, true, true);
                         // Append it to the select
                         $('#movie-select').append(newOption).trigger('change');
                     }
                 }
                 }, fail => console.log(fail)).catch(err => console.error(err));
             }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
            break;
        case "2":
            fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`, options)
        .then(response => {
            { 
                let data = response.json();
                $('#movie-select').empty().trigger("change");
                data.then(data => {
                 if(data.results){
                    let results = data.results;
                    tvArr = [...tvArr, ...results];
                     for (const item of results){
                         var newOption = new Option(item.name, item.id, true, true);
                         // Append it to the select
                         $('#movie-select').append(newOption).trigger('change');
                     }
                 }
                 }, fail => console.log(fail)).catch(err => console.error(err));
             }
        })
        .then(response => console.log(response))
        .catch(err => console.error(err));
            break;
        default:
            console.log('default');
    }

}