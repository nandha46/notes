// import config from '../config';

var movArr = [];
var tvArr = [];

// let tmdb_bearer_token = config.get('tmdb_bearer_token');

$(function(){
    $('#download-list-form').on('submit', () => {

        let data = {
            'mediaType': $('#media-select').val(),
            'selectedTitle': $('#movie-select').val(),
            'adult': $('#customSwitch1').is(':checked'),
            'priority': $('#priority')[0].noUiSlider.get(),
            'url': $('#url').val(),
            'comment': $('#comment').val(),
            'movArr': movArr,
            'tvArr': tvArr,
            'tags':$('#tag-select').val()
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

    NioApp.DataTable.init2 = function () {
        NioApp.DataTable('.datatable-init-export-serverside', {
          responsive: {
            details: true,
          },
            ajax: { 
                "url":'api/v1/persons',
                "type":"POST"
            },
            columns: [
                { data: 'name' },
                { data: 'gender' },
                { data: 'age' },
                { data: 'place_of_birth' },
                { data: 'popularity' },
                { data: 'known_for_department' },
                { data: 'birthday' },
                { data: 'movie_credits.cast.length' },
                { data: 'tv_credits.cast.length' },
                { data: 'options', className:'nk-tb-col-tools' }
            ],
            "stripeClasses": [ 'nk-tb-item odd', 'nk-tb-item even' ],
            processing: true,
            serverSide: true,
          buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis']
        });
        
        NioApp.DataTable('.datatable-init-export-serverside-movies', {
          responsive: {
            details: true,
          },
            ajax: { 
                "url":'api/v1/movies',
                "type":"POST"
            },
            columns: [
                { data: 'title' },
                { data: 'language.english_name' },
                { data: 'vote_average' },
                { data: 'genre_ids' },
                { data: 'release_date' },
                { data: 'options', className:'nk-tb-col-tools' }
            ],
            "stripeClasses": [ 'nk-tb-item odd', 'nk-tb-item even' ],
            processing: true,
            serverSide: true,
          buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis']
        });
        
        NioApp.DataTable('.datatable-init-export-serverside-fav-persons', {
          responsive: {
            details: true,
          },
            ajax: { 
                "url":'api/v1/fav/persons',
                "type":"POST"
            },
            columns: [
                { data: 'person.name' },
                { data: 'person.gender' },
                { data: 'person.age' },
                { data: 'person.place_of_birth' },
                { data: 'person.popularity' },
                { data: 'person.known_for_department' },
                { data: 'person.birthday' },
                { data: 'rating' },
                { data: 'tag_formatted' },
                { data: 'options', className:'nk-tb-col-tools' }
            ],
            "stripeClasses": [ 'nk-tb-item odd', 'nk-tb-item even' ],
            processing: true,
            serverSide: true,
          buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis']
        });
        
        NioApp.DataTable('.datatable-init-export-serverside-known-persons', {
          responsive: {
            details: true,
          },
            ajax: { 
                "url":'api/v1/known/persons',
                "type":"POST"
            },
            columns: [
                { data: 'person.name' },
                { data: 'person.gender' },
                { data: 'person.age' },
                { data: 'person.place_of_birth' },
                { data: 'person.popularity' },
                { data: 'person.known_for_department' },
                { data: 'person.birthday' },
                { data: 'rating' },
                { data: 'tag_formatted' },
                { data: 'options', className:'nk-tb-col-tools' }
            ],
            "stripeClasses": [ 'nk-tb-item odd', 'nk-tb-item even' ],
            processing: true,
            serverSide: true,
          buttons: ['copy', 'excel', 'csv', 'pdf', 'colvis']
        });
    };

      NioApp.DataTable.init2();

    NioApp.Select2.init = function () {
        NioApp.Select2('.js-select2-ajax', { 
            placeholder: 'Select an option yourself',
            minimumInputLength: 2,
    ajax: {
        url: "/api/v1/tags",
        dataType: 'json',
        quietMillis: 100,
        data: function (term, page) {
            return {
                option: term
            };
        },
        processResults: function (results) {
            var data = $.map(results, function (obj) {
                obj.text = obj.text || obj.name;
                obj.id = obj.id || obj._id;
                return obj;
            });
            return {
              results: data
            };
          }
    } 
        });
    };

    NioApp.Select2.init();
});

const loadMovieData = e => {
    let mediaType = $('#media-select').val();
    let query = $(e).val();
    if (query.length < 2)
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
                let data = response.json();
                $('#movie-select').empty().trigger("change");
                data.then(data => {
                 if(data.results){
                    let results = data.results;
                    movArr = [...movArr, ...results];
                     for (const item of results){
                        let releaseYear = ('release_date' in item) ? new Date(item.release_date).toLocaleDateString('en-US', {year: 'numeric' }):'';
                        let optionName = item.title+" ("+releaseYear+")";
                         var newOption = new Option(optionName, item.id, true, true);
                         // Append it to the select
                         $('#movie-select').append(newOption).trigger('change');
                     }
                 }
                 }, fail => console.log(fail)).catch(err => console.error(err));
        })
        // .then(response => console.log(response))
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
                        let releaseYear = ('first_air_date' in item) ? new Date(item.first_air_date).toLocaleDateString('en-US', {year: 'numeric' }):'';
                        let optionName = item.name+" ("+releaseYear+")";
                         var newOption = new Option(optionName, item.id, true, true);
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

const markFavouritePerson = (id) => {
    fetch(`http://localhost:8000/api/v1/person/fav/${id}`, {
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }).then(()=> {
        NioApp.Toast('Marked as Favoutite.', 'success', {position: 'top-right'});
    console.log('marked as favoutite', id);
    }).catch(err => {
        NioApp.Toast('Error Marking Favourite. Check console.', 'error', {position: 'top-right'});
        console.error(err)
    console.log('Error marking as favoutite', id);
    });
}

const markKnownPerson = (id) => {
    fetch(`http://localhost:8000/api/v1/person/known/${id}`, {
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }).then(()=> {
        NioApp.Toast('Marked as Known.', 'success', {position: 'top-right'});
    console.log('marked as Known', id);
    }).catch(err => {
        NioApp.Toast('Error Marking Known. Check console.', 'error', {position: 'top-right'});
        console.error(err)
    console.log('Error marking as Known', id);
    });
}

const loadPersonsAction = e => {
    
    $(e).children().children().children('.icon').removeClass('ni-check-thick').addClass('ni-loader spin-loader');
    
    fetch(`http://localhost:8000/actions/load-persons-from-cast`, {
        method:'GET',
        headers:{
            accept:'application/json'
        }
    }).then(response => {
        response.json().then(data => console.log(data)).catch(err => console.error(err));
        NioApp.Toast('Persons Updated.', 'success', {position: 'top-right'});
        $(e).children().children().children('.icon').addClass('ni-check-thick').removeClass('ni-loader spin-loader');
    }).catch(err => {
        NioApp.Toast('Error updating persons. Check console.', 'error', {position: 'top-right'});
        console.error(err);
        $(e).children().children().children('.icon').addClass('ni-circle-fill').removeClass('ni-loader spin-loader');
    });

}

const loadPostersAction = e => {

}