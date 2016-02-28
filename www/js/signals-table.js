"use strict";

var SignalsTable = React.createClass({
    displayName: "SignalsTable",

    render: function render() {
        var signals = this.props.signals;
        return React.createElement(
            "ul",
            { className: "table-view", id: "signals-table" },
            React.createElement(
                "li",
                { className: "table-view-cell" },
                React.createElement(
                    "ul",
                    { className: "signal header" },
                    React.createElement(
                        "li",
                        { className: "symbol" },
                        "Symbol"
                    ),
                    React.createElement(
                        "li",
                        { className: "direction" },
                        "Option type"
                    ),
                    React.createElement(
                        "li",
                        { className: "time" },
                        "Time"
                    ),
                    React.createElement(
                        "li",
                        { className: "reliability" },
                        "Reliability"
                    )
                )
            ),
            React.createElement("li", { className: "table-view-divider" }),
            signals.map(function (signal) {
                var directionClassName = 'direction direction-' + signal.direction.toString().toLowerCase();
                var reliabilityClassName = 'reliability reliability-' + signal.reliability;
                return React.createElement(
                    "li",
                    { key: signal.key, className: "table-view-cell" },
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
                            { className: directionClassName },
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
                            " "
                        )
                    )
                );
            })
        );
    }
});