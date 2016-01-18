var SignalsTable = React.createClass({
    render: function() {
        var signals = this.props.signals;
        return (
            <ul className="table-view" id="signals-table">
            { signals.map(function(signal){
                var reliabilityClassName = 'reliability reliability-' + signal.reliability;
                return <li className="table-view-cell">
                    <ul className="signal">
                        <li className="symbol">{signal.symbol}</li>
                        <li className="direction">{signal.direction}</li>
                        <li className="time">{signal.time}</li>
                        <li className={reliabilityClassName}>{signal.reliability}</li>
                    </ul>
                </li>;
            }) }
            </ul>
        );
    }
});