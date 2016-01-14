"use strict";

var HelloMessage = React.createClass({
    displayName: "HelloMessage",

    render: function render() {
        return React.createElement(
            "li",
            { className: "table-view-cell" },
            "Item 1"
        );
    }
});