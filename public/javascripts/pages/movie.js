
/**
 * var RemodalEz - description
 *
 * @param  {type} function($ description
 * @param  {type} w          description
 * @param  {type} undefined  description
 * @return {type}            description
 */
const RemodalEz = (function($, w, undefined) {
    var _defaults = {
        title: false,
        close: true,
        body: false,
        cancel: false,
        confirm: false
    };

    var modal,
        $wrapper = $('<div class="remodal remodal-wrapper" data-remodal-id="modal"></div>'),
        $close = $('<button data-remodal-action="close" class="remodal-close"></button>'),
        $cancel = $('<button data-remodal-action="cancel" class="remodal-cancel">Cancel</button>'),
        $confirm = $('<button data-remodal-action="confirm" class="remodal-confirm">OK</button>');

    function alert(message) {
        $wrapper.append($close).append(message);
        if (typeof modal === 'undefined') {
            modal = $wrapper.remodal({
                hashTracking: false
            });
        } else {
            modal.message = message;
        }
        modal.open();
    }

    $wrapper.empty();

    function dialog(options) {
        var settings = $.extend({}, _defaults, options);


        if (typeof modal === 'undefined') {
            if (settings.close) {
                $wrapper.append($close);
            }
            if (settings.title) {
                $wrapper.append('<h1>' + settings.title + '</h1>');
            }

            if (settings.body) {
                var $body = $('<div class="modal-body">' + settings.body + '</div>');
                $wrapper.append($body);
            }

            if (settings.confirm) {
                $wrapper.append($confirm);
            }

            if (settings.cancel) {
                $wrapper.append($cancel);
            }
        }
        modal = $wrapper.remodal({
            hashTracking: false
        });
        modal.open();

    }

    return {
        alert: alert,
        dialog: dialog
    };

}(jQuery, window, undefined));


/**
 * handleDelete - Delete Movie Item from DB
 *
 * @param  {string} id: unique id of movie
 * @return {void} refreshes the page
 */
function handleDelete(id) {
    log(id.toString());
    del('/movies', {
        id: id.toString()
    });
    location.reload();
};

/**
 * postMovieIfNotExist - Post Movie to DynamoDB if it doesn't exist
 *
 * @param  {string} movie
 * @param  {int} year
 * @param  {string} password
 * @return {void}
 */
function postMovieIfNotExist(movie, year, password) {
    for (var i = 0; i < info.Items.length; i++) {
        if (info.Items[i].title.toUpperCase() === movie.toUpperCase()) {
            RemodalEz.dialog({
                title: 'Uh Oh',
                body: 'That movie is already on here!'
            });
            return;
        }
    }

    post('/movies', {
        movie: movie,
        year: year,
        password: password
    }, function(data, status) {
        location.reload();
    });
}

$(document).ready(function() {
    $('.submit').click(function() {
        const movie = document.getElementById('movieName').value;
        if (!movie) return;

        const year = document.getElementById('year').value;
        const password = document.getElementById('password').value;

        postMovieIfNotExist(movie, year, password);
    });

    var $input = document.getElementById('searchBox');
    var baseUrl = "http://sg.media-imdb.com/suggests/";
    var $result = document.getElementById('result');
    var body = document.getElementsByTagName('body');

    $input.addEventListener('keyup', function() {

        //clearing blank spaces from input
        var cleanInput = $input.value.replace(/\s/g, "");

        //clearing result div if the input box in empty
        if (cleanInput.length === 0) {
            $result.innerHTML = "";
        }

        if (cleanInput.length > 0) {

            var queryUrl = baseUrl + cleanInput[0].toLowerCase() + "/" +
                cleanInput.toLowerCase() +
                ".json";

            $.ajax({

                url: queryUrl,
                dataType: 'jsonp',
                cache: true,
                jsonp: false,
                jsonpCallback: "imdb$" + cleanInput.toLowerCase()

            }).done(function(result) {

                //clearing result div if there is a valid response
                if (result.d.length > 0) {
                    $result.innerHTML = "";
                }

                for (var i = 0; i < result.d.length; i++) {

                    var category = result.d[i].id.slice(0, 2);
                    if (category==="nm") {
                      continue; //Remove this if want search for actor names as well
                    }

                    if (category === "tt" || category === "nm") {
                        //row for risplaying one result
                        let resultRow = document.createElement('a');
                        resultRow.setAttribute('class', 'resultRow');
                        let destinationUrl;

                        if (category === "tt") {
                            destinationUrl = "http://www.imdb.com/title/" + result.d[i].id;
                        } else {
                            destinationUrl = "http://www.imdb.com/name/" + result.d[i].id;
                        }

                        // resultRow.setAttribute('href', destinationUrl);
                        // resultRow.setAttribute('target', '_blank');
                        resultRow.addEventListener("click", function(e) {
                          var children = $(this).closest('.resultRow')[0].children[1].children;
                          postMovieIfNotExist(children[0].innerText, children[1].innerText, "dummy");
                        }, false);

                        //creating and setting poster
                        var poster = document.createElement('img');
                        poster.setAttribute('class', 'poster');

                        if (result.d[i].i[0]) {
                            poster.setAttribute('src', result.d[i].i[0]);
                        }

                        //creating and setting description
                        var description = document.createElement('div');
                        description.setAttribute('class', 'description');
                        var name = document.createElement('h4');
                        var year = document.createElement('h4');
                        var snippet = document.createElement('h5');

                        if (category === "tt" && result.d[i].y) {
                            name.innerHTML = result.d[i].l;
                            year.innerHTML = " (" + result.d[i].y + ")";
                            name.setAttribute('class', 'suggestion-movie-name');
                            year.setAttribute('class', 'suggestion-movie-year');
                        } else {
                            name.innerHTML = result.d[i].l;
                            name.setAttribute('class', 'suggestion-movie-name');
                        }
                        snippet.innerHTML = result.d[i].s || "Actors unavailable";

                        $(description).append(name);
                        $(description).append(year);
                        $(description).append(snippet);

                        $(resultRow).append(poster);
                        $(resultRow).append(description);
                        $("#result").append(resultRow);
                    }
                }

            });
        }
    });
});
