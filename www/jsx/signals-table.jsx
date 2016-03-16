var SignalsTable = React.createClass({

    // This function returns seconds count before next signals arriving.
    getElapsedTime: function(){
        // console.log('getElapsedTime()', this.state.signals, this.state.interval);
        // Birth time of recent signal in milliseconds
        var maxSignalTime = 0;

        // Walk through all signals to calc max signal time
        for (var i = 0; i < this.state.signals.length; i++) {
            maxSignalTime = Math.max(this.state.signals[i].tsMs, maxSignalTime);
        }

        // Time when new signal will arrived.
        var signalsArrivingTime = maxSignalTime + this.state.interval;

        var elapsedTime = signalsArrivingTime - new Date();
        // console.log('Max signal time:', maxSignalTime);
        // console.log('Time:           ', +new Date());
        // console.log('Interval:', this.state.interval);
        // console.log('Elapsed time:', elapsedTime);

        return Math.max(0, elapsedTime);
    },

    getInitialState: function(){
        // console.log('getInitialState');
        return {
            elapsed: 0
            , signals: this.props.signals
            , interval: this.props.interval
        };
    },

    componentDidMount: function(){
        this.timer = setInterval(this.tick, 500);
    },

    componentWillUnmount: function(){
        clearInterval(this.timer);
    },

    tick: function(){
        this.setState({elapsed: this.getElapsedTime()});
    },

    addSignal: function (signal) {
        var signals = this.props.signals;
        signals.unshift(signal);
        this.setState({signals: signals});
    },

    render: function() {
        // Это даст нам число с одной цифрой после запятой dot (xx.x):
        var elapsedString = (this.state.elapsed / 1000).toFixed(3) + ' seconds';
        // console.log('SignalsTable properties:', this.props);
        var signals = this.props.signals;
        return (
            <ul className="table-view" id="signals-table">
                <li className="table-view-cell">
                    <p>Next update in <b>{elapsedString}</b></p>
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
                        <li className="symbol">{signal.symbol} #{signal.key}</li>
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