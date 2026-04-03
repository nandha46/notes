// import config from '../config';

var movArr = [];
var tvArr = [];

// let tmdb_bearer_token = config.get('tmdb_bearer_token');

$(function () {
  let clearFormInputs = () => {
    $("#movie-select").empty().trigger("change");
    $("#priority")[0].noUiSlider.set(5);
    $("#url").val("");
    $("#comment").val("");
    $("#tag-select").empty().trigger("change");
    movArr = [];
    tvArr = [];
  };

  $("#download-list-form").on("submit", () => {
    let data = {
      mediaType: $("#media-select").val(),
      selectedTitle: $("#movie-select").val(),
      adult: $("#customSwitch1").is(":checked"),
      priority: $("#priority")[0].noUiSlider.get(),
      url: $("#url").val(),
      comment: $("#comment").val(),
      movArr: movArr,
      tvArr: tvArr,
      tags: $("#tag-select").val(),
    };

    $.ajax({
      url: "/add-to-download-list",
      type: "post",
      data: JSON.stringify(data),
      contentType: "application/json",
    })
      .done(function (result) {
        if (result.status) {
          Swal.fire("Good job!", "Added to watchlist!", "success");
          clearFormInputs();
        } else {
          Swal.fire(`${result.message}!`, "", "error");
        }
      })
      .fail(function (xhr, status, error) {
        Swal.fire(`Error!`, "Check the console for more..", "error");
        console.log("Error:", error);
      });
    return false;
  });

  NioApp.DataTable.init2 = function () {
    NioApp.DataTable(".datatable-init-export-serverside", {
      responsive: {
        details: true,
      },
      ajax: {
        url: "api/v1/persons",
        type: "POST",
      },
      columns: [
        { data: "profile" },
        { data: "gender" },
        { data: "age" },
        { data: "place_of_birth" },
        { data: "popularity" },
        { data: "known_for_department" },
        { data: "birthday" },
        { data: "movie_credits.cast.length" },
        { data: "tv_credits.cast.length" },
        { data: "options", className: "nk-tb-col-tools" },
      ],
      stripeClasses: ["nk-tb-item odd", "nk-tb-item even"],
      processing: true,
      serverSide: true,
      buttons: ["copy", "excel", "csv", "pdf", "colvis"],
    });

    NioApp.DataTable(".datatable-init-export-serverside-movies", {
      responsive: {
        details: true,
      },
      ajax: {
        url: "api/v1/movies",
        type: "POST",
      },
      columns: [
        { data: "title" },
        { data: "language.english_name" },
        { data: "vote_average" },
        { data: "genre_ids" },
        { data: "release_date" },
        { data: "options", className: "nk-tb-col-tools" },
      ],
      stripeClasses: ["nk-tb-item odd", "nk-tb-item even"],
      processing: true,
      serverSide: true,
      buttons: ["copy", "excel", "csv", "pdf", "colvis"],
    });

    NioApp.DataTable(".datatable-init-export-serverside-fav-persons", {
      responsive: {
        details: true,
      },
      ajax: {
        url: "api/v1/fav/persons",
        type: "POST",
      },
      columns: [
        { data: "person.name" },
        { data: "person.gender" },
        { data: "person.age" },
        { data: "person.place_of_birth" },
        { data: "person.popularity" },
        { data: "person.known_for_department" },
        { data: "person.birthday" },
        { data: "rating" },
        { data: "tag_formatted" },
        { data: "options", className: "nk-tb-col-tools" },
      ],
      stripeClasses: ["nk-tb-item odd", "nk-tb-item even"],
      processing: true,
      serverSide: true,
      buttons: ["copy", "excel", "csv", "pdf", "colvis"],
    });

    NioApp.DataTable(".datatable-init-export-serverside-known-persons", {
      responsive: {
        details: true,
      },
      ajax: {
        url: "api/v1/known/persons",
        type: "POST",
      },
      columns: [
        { data: "person.name" },
        { data: "person.gender" },
        { data: "person.age" },
        { data: "person.place_of_birth" },
        { data: "person.popularity" },
        { data: "person.known_for_department" },
        { data: "person.birthday" },
        { data: "rating" },
        { data: "tag_formatted" },
        { data: "options", className: "nk-tb-col-tools" },
      ],
      stripeClasses: ["nk-tb-item odd", "nk-tb-item even"],
      processing: true,
      serverSide: true,
      buttons: ["copy", "excel", "csv", "pdf", "colvis"],
    });
  };

  NioApp.DataTable.init2();

  NioApp.Select2.init = function () {
    NioApp.Select2(".js-select2-ajax", {
      placeholder: "Select an option yourself",
      minimumInputLength: 2,
      ajax: {
        url: "/api/v1/tags",
        dataType: "json",
        quietMillis: 100,
        data: function (term, page) {
          return {
            option: term,
          };
        },
        processResults: function (results) {
          var data = $.map(results, function (obj) {
            obj.text = obj.text || obj.name;
            obj.id = obj.id || obj._id;
            return obj;
          });
          return {
            results: data,
          };
        },
      },
    });
  };

  NioApp.Select2.init();

  // Check for active sync on load
  checkActiveSync();
});

let syncInterval = null;

const checkActiveSync = () => {
  fetch("/actions/sync-status")
    .then(res => res.json())
    .then(data => {
      if (data && data.isRunning) {
        showSyncModal();
        startPolling();
      }
    })
    .catch(err => console.error("Error checking sync status:", err));
};

const showSyncModal = () => {
  const modal = new bootstrap.Modal(document.getElementById('syncProgressModal'));
  modal.show();
  $("#btnStopSync").removeClass("d-none");
  $("#btnCloseSyncModal").addClass("d-none");
};

const startPolling = () => {
  if (syncInterval) clearInterval(syncInterval);
  syncInterval = setInterval(() => {
    fetch("/actions/sync-status")
      .then(res => res.json())
      .then(data => {
        updateSyncUI(data);
        if (!data.isRunning) {
          stopPolling();
          $("#btnStopSync").addClass("d-none");
          $("#btnCloseSyncModal").removeClass("d-none");
          if (data.stopRequested) {
            $("#syncProgressMovie").text("Stopped by user");
          } else {
            $("#syncProgressMovie").text("Completed successfully");
          }
        }
      })
      .catch(err => {
        console.error("Polling error:", err);
        stopPolling();
      });
  }, 2000);
};

const stopPolling = () => {
  if (syncInterval) {
    clearInterval(syncInterval);
    syncInterval = null;
  }
};

const updateSyncUI = (data) => {
  if (!data) return;
  
  $("#syncProgressMovie").text(data.currentMovie || "Processing...");
  $("#syncStatMovies").text(`${data.updatedMovies} / ${data.totalMovies}`);
  $("#syncStatPersons").text(data.updatedPersons);
  $("#syncStatDuplicates").text(data.duplicatePersons);
  
  const percent = data.totalMovies > 0 ? Math.round((data.updatedMovies / data.totalMovies) * 100) : 0;
  $("#syncProgressBar").css("width", percent + "%").text(percent + "%").attr("aria-valuenow", percent);
};

const stopSyncAction = () => {
  if (!confirm("Are you sure you want to stop the synchronization?")) return;
  
  fetch("/actions/stop-sync", { method: "POST" })
    .then(res => res.json())
    .then(data => {
      NioApp.Toast("Stop request sent", "info", { position: "top-right" });
    })
    .catch(err => console.error("Error stopping sync:", err));
};

const loadMovieData = (e) => {
  let mediaType = $("#media-select").val();
  let query = $(e).val();
  if (query.length < 2) return false;
  let url = "";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzU2YTNmOTk4MWMzMjRmMDE3MDI5MTY4MmUwNzQ2ZSIsInN1YiI6IjYzMzBiMWRlYTVkODQ5MDA5MjU1OTY2ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VyrNPvyjIohhS-gGcJxBJbfAar6xJNMljeJOkU35NkU",
    },
  };

  switch (mediaType) {
    case "1":
      fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=true&language=en-US&page=1`,
        options
      )
        .then((response) => {
          let data = response.json();
          $("#movie-select").empty().trigger("change");
          data
            .then(
              (data) => {
                if (data.results) {
                  let results = data.results;
                  movArr = [...movArr, ...results];
                  for (const item of results) {
                    let releaseYear =
                      "release_date" in item
                        ? new Date(item.release_date).toLocaleDateString(
                            "en-US",
                            { year: "numeric" }
                          )
                        : "";
                    let optionName = item.title + " (" + releaseYear + ")";
                    var newOption = new Option(optionName, item.id, true, true);
                    // Append it to the select
                    $("#movie-select").append(newOption).trigger("change");
                  }
                }
              },
              (fail) => console.log(fail)
            )
            .catch((err) => console.error(err));
        })
        // .then(response => console.log(response))
        .catch((err) => console.error(err));
      break;
    case "2":
      fetch(
        `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`,
        options
      )
        .then((response) => {
          let data = response.json();
          $("#movie-select").empty().trigger("change");
          data
            .then(
              (data) => {
                if (data.results) {
                  let results = data.results;
                  tvArr = [...tvArr, ...results];
                  for (const item of results) {
                    let releaseYear =
                      "first_air_date" in item
                        ? new Date(item.first_air_date).toLocaleDateString(
                            "en-US",
                            { year: "numeric" }
                          )
                        : "";
                    let optionName = item.name + " (" + releaseYear + ")";
                    var newOption = new Option(optionName, item.id, true, true);
                    // Append it to the select
                    $("#movie-select").append(newOption).trigger("change");
                  }
                }
              },
              (fail) => console.log(fail)
            )
            .catch((err) => console.error(err));
        })
        .then((response) => console.log(response))
        .catch((err) => console.error(err));
      break;
    default:
      console.log("default");
  }
};

const markFavouritePerson = (id) => {
  fetch(`http://localhost:8000/api/v1/person/fav/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then(() => {
      NioApp.Toast("Marked as Favoutite.", "success", {
        position: "top-right",
      });
      console.log("marked as favoutite", id);
    })
    .catch((err) => {
      NioApp.Toast("Error Marking Favourite. Check console.", "error", {
        position: "top-right",
      });
      console.error(err);
      console.log("Error marking as favoutite", id);
    });
};

const markKnownPerson = (id) => {
  fetch(`http://localhost:8000/api/v1/person/known/${id}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then(() => {
      NioApp.Toast("Marked as Known.", "success", { position: "top-right" });
      console.log("marked as Known", id);
    })
    .catch((err) => {
      NioApp.Toast("Error Marking Known. Check console.", "error", {
        position: "top-right",
      });
      console.error(err);
      console.log("Error marking as Known", id);
    });
};

const loadPersonsAction = (e) => {
  fetch(`/actions/load-persons-from-cast`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then(async (response) => {
      const data = await response.json();
      if (data.status === "started") {
        showSyncModal();
        startPolling();
      } else if (data.status === "already_running") {
        NioApp.Toast("A sync is already in progress.", "warning", { position: "top-right" });
        showSyncModal();
        startPolling();
      }
    })
    .catch((err) => {
      NioApp.Toast("Error starting sync. Check console.", "error", {
        position: "top-center",
      });
      console.error(err);
    });
};
const loadPersonsPostersAction = (e) => {
  $(e)
    .children()
    .children()
    .children(".icon")
    .removeClass("ni-check-thick")
    .addClass("ni-loader spin-loader");

  fetch(`http://localhost:8000/download-persons-posters`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  })
    .then(async (response) => {
      const data = await response.json();
      console.log(data, "data");
      if (!data.status) {
        alert("Status false..");
      }
      // Sweet Alert
      Swal.fire({
        title: "Persons posters downloaded!",
        html: `Downloaded: ${data.downloaded}`,
        timer: 10000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      }).then((result) => {
        if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.timer
        ) {
          console.log("I was closed by the timer"); // eslint-disable-line
        }
      });
      $(e)
        .children()
        .children()
        .children(".icon")
        .addClass("ni-check-thick")
        .removeClass("ni-loader spin-loader");
    })
    .catch((err) => {
      NioApp.Toast("Error updating persons. Check console.", "error", {
        position: "top-center",
      });
      console.error(err);
      $(e)
        .children()
        .children()
        .children(".icon")
        .addClass("ni-circle-fill")
        .removeClass("ni-loader spin-loader");
    });
};

const loadPostersAction = (e) => {
  // Path:  /load-certifications
};

const loadCertificates = (e) => {};
