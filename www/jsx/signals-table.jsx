var SignalsTable = React.createClass({
    render: function() {
        var signals = this.props.signals;
        return (
            <ul className="table-view" id="signals-table">
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