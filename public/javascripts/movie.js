function handleDelete(id) {
    log(id.toString());
    del('/movie-list', {
        id: id.toString()
    });
    location.reload();
};

$(document).ready(function() {
    $('.submit').click(function() {
        const movie = document.getElementById('movieName').value;
        if(!movie) return;

        const year = document.getElementById('year').value;
        const password = document.getElementById('password').value;

        console.log(password);
        for (var i = 0; i < info.Items.length; i++) {
            if(info.Items[i].title.toUpperCase() === movie.toUpperCase()) {
                RemodalEz.dialog({
                  title: 'Uh Oh',
                  body: 'That movie is already on here!'
                });
                return;
            }
        }

        post('/movie-list', {
            movie: movie,
            year: year,
            post: true
        }, function(data, status) {
          location.reload();
        });
    });

    $('.play-btn').click(function() {
        const $grid = $(this).parent().parent().parent(); // Find the row
        const $title = $grid.find('.grid-title').text(); // Find the text
        const $year = $grid.find('.grid-year').text(); // Find the text
        post('/movie-list', {
            movie: $title,
            year: $year,
            post: false
        }, function(status) {
          console.log(status);
        });
    });

    $(function() {
        function callback() {
            setTimeout(function() {
                $('#button').removeClass('validate');
            }, 1250);
        }

        function validate() {
            setTimeout(function() {
                $('#button').removeClass('onclic');
                $('#button').addClass('validate');
                setTimeout(callback, 450);
            }, 2250);
        }

        $('#button').click(function() {
            $('#button').addClass('onclic');
            setTimeout(validate, 250);
        });
    });
});
