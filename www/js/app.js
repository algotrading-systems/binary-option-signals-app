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

    // Symbols dictionary
    window.symbols = {};
    // Loaded signals storage
    window.signals = {};

    var initSignalsTable = function(signals){
        console && console.log('Signals table initialization...');
        ReactDOM.render(
            React.createElement(SignalsTable, {signals: signals}),
            window.document.getElementById('signals-table-container')
        );
    };

    $('.segmented-control a').click(function () {
        $('.segmented-control a').removeClass('active');
        $(this).addClass('active');
        var timeFrame = $(this).data('timeFrame');
    });

    var client = new $.RestClient('http://platform.algotrading.systems/api/', {
        cache: 15,
        cachableMethods: ["GET"]
    });

    client.add('symbols');
    client.add('signals');

    client.symbols.read().done(function(data){
        for(var i in data.symbols){
            symbols[data.symbols[i].id] = data.symbols[i];
        }
        console && console.log('Symbols dictionary initialized successfully.');
        client.signals.read().done(function(data) {
            var signals = [];
            for(var i in data.signals){
                var signal = data.signals[i];
                var symbolId = signal.symbol_id;
                var direction = (signal.direction == 'Up') ? 'Call' : 'Put';
                signals.push({
                    key: signal.id,
                    symbol: window.symbols[symbolId].name,
                    direction: direction,
                    time: (new Date(signal.created_at)).toTimeString().substr(0, 8),
                    reliability: signal.id % 11
                });
            }
            initSignalsTable(signals);
        });
    });


})(window);