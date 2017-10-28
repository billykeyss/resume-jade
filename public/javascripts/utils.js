const shouldPrint = false;
var log = shouldPrint ? console.log.bind(window.console) : function() {};

function post(path, params, callback) {
    $.post(path, params, function(data, status) {
        callback(data, status);
    });
}

function del(path, params) {
    $.ajax({
        type: 'DELETE',
        url: path,
        data: params,
        success: function() {
            log('Deleted');
        }
    });
}
