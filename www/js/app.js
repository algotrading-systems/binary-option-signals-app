'use strict';

(function($) {
    $.rand = function(arg) {
        if ($.isArray(arg)) {
            return arg[$.rand(arg.length)];
        } else if (typeof arg === "number") {
            return Math.floor(Math.random() * arg);
        } else {
            return 4;  // chosen by fair dice roll
        }
    };
})(jQuery);

(function (window) {

    var getSignals = function(count){
        var symbols = ['USDJPY', 'EURUSD', 'Silver', 'Gold'];
        var directions = ['Call', 'Put'];
        var signals = [];
        count = count || 10;
        for(var i = 0; i < count; i++){
            var signal = {
                symbol: $.rand(symbols),
                direction: $.rand(directions)
            };
            signals.push(signal);
        }
        return signals;
    };

    var signals = getSignals(10);

    ReactDOM.render(
        React.createElement(SignalsTable, {signals: signals}),
        window.document.getElementById('signals-table')
    );

    $('.segmented-control a').click(function () {
        $('.segmented-control a').removeClass('active');
        $(this).addClass('active');
        var timeFrame = $(this).data('timeFrame');
    });

})(window);