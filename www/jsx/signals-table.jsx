var SignalsTable = React.createClass({

    getInitialState: function(){
        console.log('getInitialState');
        return { elapsed: 0, start: Date.now() };
    },

    componentDidMount: function(){
        // this.timer = setInterval(this.tick, 1000);
    },


    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        this.setState({elapsed: new Date() - this.props.start});
    },

    addSignal: function (signal) {
        var signals = this.props.signals;
        signals.unshift(signal);
        this.setState({signals: signals});
    },

    render: function() {
        var elapsed = Math.round(this.state.elapsed / 100);
        // Это даст нам число с одной цифрой после запятой dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);
        console.log('SignalsTable properties:', this.props);
        var signals = this.props.signals;
        return (
            <ul className="table-view" id="signals-table">
                <li className="table-view-cell">
                    <p>This example was started <b>{seconds} seconds</b> ago.</p>
                </li>
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