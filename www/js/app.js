'use strict';

(function (window) {

    // Trade System BOSS.
    window.tradeSystemSlug = 'binary-options-signals-source';
    // BOSS provides trade signals signals every 5 minutes.
    window.tradeSystemInverval = 60000;
    // Symbols dictionary.
    window.symbols = {};
    // Signals table object for easy data manipulation.
    window.signalsTable = null;
    // Max loaded symbol's ID.
    window.maxSignalId = 0;
    // Max signals count. We should not store old or expired signals.
    window.maxSignalsCount = 10;

    var loadedSignalsCount = 0;

    var loadSignal = function(signal){
        if (updateMaxSignalId(signal.id) < window.maxSignalId && loadedSignalsCount >= window.maxSignalsCount) {
            // console.log('Signal #' + signal.id + ' skipped');
            return false;
        }
        console.log('Signal #' + signal.id + ' loaded');
        loadedSignalsCount++;
        window.signalsTable.addSignal(signal);
    };

    var updateMaxSignalId = function (value) {
        window.maxSignalId = Math.max(value, window.maxSignalId);
        return value;
    };

    var initSignalsTable = function(signals){
        console && console.log('Signals table initialization...');
        window.signalsTable = ReactDOM.render(
            React.createElement(SignalsTable, {
                signals: signals
                , interval: window.tradeSystemInverval
                , limit: window.maxSignalsCount
            }),
            window.document.getElementById('signals-table-container')
        );
    };

    $('.segmented-control a').click(function () {
        $('.segmented-control a').removeClass('active');
        $(this).addClass('active');
        var timeFrame = $(this).data('timeFrame');
    });

    var client = new $.RestClient('http://algotrading.space/api/', {
        cache: false
        // cachableMethods: ["GET"]
    });

    // Assign our symbols with API endpoint
    client.add('symbols');
    // Assign our signals with API endpoint
    client.add('signals');

    initSignalsTable([]);

    var timer = null;

    var feed = function() {
        console.log('feed');
        client.signals.read( window.tradeSystemSlug ).done(function(data) {
            for (var i in data.signals) {
                var signal = data.signals[i];
                var symbolId = signal.symbol_id;
                var direction = (signal.direction == 'Up') ? 'Call' : 'Put';
                loadSignal({
                    key: signal.id
                    , id: signal.id
                    , symbol: window.symbols[symbolId].name
                    , direction: direction
                    , time: signal.created_at.substr(11, 8)
                    , reliability: signal.reliability
                    , tsMs: +new Date(signal.created_at) - (new Date).getTimezoneOffset() * 1000 * 60
                });
            }
        });
    };

    client.symbols.read().done(function(data){
        // Symbols dictionary initialization
        for(var i in data.symbols){
            symbols[data.symbols[i].id] = data.symbols[i];
        }
        console && console.log('Symbols dictionary initialized successfully.', window.tradeSystemInverval + 3000);

        timer = setInterval(feed, window.tradeSystemInverval + 3000);

        feed();
    });


})(window);