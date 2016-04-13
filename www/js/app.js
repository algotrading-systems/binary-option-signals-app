'use strict';

(function (window) {

    // Trade System BOSS.
    var tradeSystemSlug = 'binary-options-signals-source';
    // BOSS provides trade signals signals every 5 minutes.
    var tradeSystemInverval = 60000;
    // Symbols dictionary.
    var symbols = {};
    // Signals table object for easy data manipulation.
    var symbolsTable = null;
    // Max loaded symbol's ID.
    var maxSignalId = 0;
    // Max loaded signal time (timestamp in milliseconds)
    var maxSignalTime = 0;
    // Max delay for server response retrieving
    var maxServerDelay = 2000;
    // Max signals count. We should not store old or expired signals.
    var maxSignalsCount = 10;

    var loadSignal = function(signal){
        if (signal.id <= maxSignalId) {
            return false;
        }
        maxSignalId = Math.max(signal.id, maxSignalId);
        maxSignalTime = Math.max(signal.tsMs, maxSignalTime);
        symbolsTable.addSignal(signal);
    };

    var initSignalsTable = function(signals){
        symbolsTable = ReactDOM.render(
            React.createElement(SignalsTable, {
                signals: signals
                , interval: tradeSystemInverval
                , limit: maxSignalsCount
            }),
            window.document.getElementById('signals-table-container')
        );
    };

    var client = new $.RestClient('http://algotrading.space/api/', {
        cache: 5
    });

    // Assign our symbols with API endpoint
    client.add('symbols');
    // Assign our signals with API endpoint
    client.add('signals');

    initSignalsTable([]);

    var feed = function() {
        client.signals.read( tradeSystemSlug ).done(function(data) {
            data.signals.sort(function (a, b) {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                }
                return 0;
            });
            for (var i in data.signals) {
                var signal = data.signals[i];
                loadSignal({
                    key: signal.id
                    , id: signal.id
                    , symbol: symbols[signal.symbol_id].name
                    , direction: (signal.direction == 'Up') ? 'Call' : 'Put'
                    , time: signal.created_at.substr(11, 8)
                    , reliability: signal.reliability
                    , tsMs: +new Date(signal.created_at) - (new Date).getTimezoneOffset() * 1000 * 60
                });
            }
            var timeout = maxSignalTime + tradeSystemInverval -new Date() + maxServerDelay;
            var clock = $('#timer').FlipClock(timeout / 1000, {
                countdown: true,
                clockFace: 'MinuteCounter'
            });
            setTimeout(feed, timeout);
        });
    };

    client.symbols.read().done(function(data){
        // Symbols dictionary initialization
        for(var i in data.symbols){
            symbols[data.symbols[i].id] = data.symbols[i];
        }
        feed();
    });


})(window);