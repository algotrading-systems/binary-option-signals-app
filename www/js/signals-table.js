'use strict';

var SignalsTable = React.createClass({
    displayName: 'SignalsTable',


    getInitialState: function getInitialState() {
        console.log('getInitialState');
        return { elapsed: 0, start: Date.now() };
    },

    componentDidMount: function componentDidMount() {
        // this.timer = setInterval(this.tick, 1000);
    },

    componentWillUnmount: function componentWillUnmount() {
        clearInterval(this.timer);
    },

    tick: function tick() {
        this.setState({ elapsed: new Date() - this.props.start });
    },

    addSignal: function addSignal(signal) {
        var signals = this.props.signals;
        signals.unshift(signal);
        this.setState({ signals: signals });
    },

    render: function render() {
        var elapsed = Math.round(this.state.elapsed / 100);
        // Это даст нам число с одной цифрой после запятой dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);
        console.log('SignalsTable properties:', this.props);
        var signals = this.props.signals;
        return React.createElement(
            'ul',
            { className: 'table-view', id: 'signals-table' },
            React.createElement(
                'li',
                { className: 'table-view-cell' },
                React.createElement(
                    'p',
                    null,
                    'This example was started ',
                    React.createElement(
                        'b',
                        null,
                        seconds,
                        ' seconds'
                    ),
                    ' ago.'
                )
            ),
            React.createElement(
                'li',
                { className: 'table-view-cell' },
                React.createElement(
                    'ul',
                    { className: 'signal header' },
                    React.createElement(
                        'li',
                        { className: 'symbol' },
                        'Symbol'
                    ),
                    React.createElement(
                        'li',
                        { className: 'direction' },
                        'Option type'
                    ),
                    React.createElement(
                        'li',
                        { className: 'time' },
                        'Time'
                    ),
                    React.createElement(
                        'li',
                        { className: 'reliability' },
                        'Reliability'
                    )
                )
            ),
            React.createElement('li', { className: 'table-view-divider' }),
            signals.map(function (signal) {
                var directionClassName = 'direction direction-' + signal.direction.toString().toLowerCase();
                var reliabilityClassName = 'reliability reliability-' + signal.reliability;
                return React.createElement(
                    'li',
                    { key: signal.key, className: 'table-view-cell' },
                    React.createElement(
                        'ul',
                        { className: 'signal' },
                        React.createElement(
                            'li',
                            { className: 'symbol' },
                            signal.symbol
                        ),
                        React.createElement(
                            'li',
                            { className: directionClassName },
                            signal.direction
                        ),
                        React.createElement(
                            'li',
                            { className: 'time' },
                            signal.time
                        ),
                        React.createElement(
                            'li',
                            { className: reliabilityClassName },
                            ' '
                        )
                    )
                );
            })
        );
    }
});