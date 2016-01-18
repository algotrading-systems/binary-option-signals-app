"use strict";

var SignalsTable = React.createClass({
    displayName: "SignalsTable",

    render: function render() {
        var signals = this.props.signals;
        return React.createElement(
            "ul",
            { className: "table-view", id: "signals-table" },
            signals.map(function (signal) {
                var reliabilityClassName = 'reliability reliability-' + signal.reliability;
                return React.createElement(
                    "li",
                    { className: "table-view-cell" },
                    React.createElement(
                        "ul",
                        { className: "signal" },
                        React.createElement(
                            "li",
                            { className: "symbol" },
                            signal.symbol
                        ),
                        React.createElement(
                            "li",
                            { className: "direction" },
                            signal.direction
                        ),
                        React.createElement(
                            "li",
                            { className: "time" },
                            signal.time
                        ),
                        React.createElement(
                            "li",
                            { className: reliabilityClassName },
                            signal.reliability
                        )
                    )
                );
            })
        );
    }
});