var SignalsTable = React.createClass({
    render: function() {
        var signals = this.props.signals;
        return (
            <ul className="table-view" id="signals-table">
                <li className="table-view-cell">
                    <ul className="signal header">
                        <li className="symbol">Symbol</li>
                        <li className="direction">Option type</li>
                        <li className="time">Time</li>
                        <li className="reliability">Reliability</li>
                    </ul>
                </li>
                <li className="table-view-divider"></li>
            { signals.map(function(signal){
                var directionClassName = 'direction direction-' + signal.direction.toString().toLowerCase();
                var reliabilityClassName = 'reliability reliability-' + signal.reliability;
                return <li key={signal.key} className="table-view-cell">
                    <ul className="signal">
                        <li className="symbol">{signal.symbol}</li>
                        <li className={directionClassName}>{signal.direction}</li>
                        <li className="time">{signal.time}</li>
                        <li className={reliabilityClassName}>&nbsp;</li>
                    </ul>
                </li>;
            }) }
            </ul>
        );
    }
});