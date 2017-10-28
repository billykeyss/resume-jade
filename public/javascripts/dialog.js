var RemodalEz = (function($, w, undefined) {
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
