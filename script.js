class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		};
	}
	
	reset() {
		this.setState ({
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		});
	}
	
	format(times) {
		return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
	}
	
	step() {
		if (!this.state.running) return;
		this.calculate();
	}
	
	calculate() {
		let { minutes, seconds, milliseconds } = this.state.times;
		milliseconds += 1;
		if (milliseconds >= 100) {
			seconds += 1;
			milliseconds = 0;
		}
		if (seconds >= 60) {
			minutes += 1;
			seconds = 0;
		}
		this.setState({
			times: {
				minutes: minutes,
				seconds: seconds,
				milliseconds: milliseconds
			}
		});
	}
	
	start() {
		if (!this.state.running) {
			this.state.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}
	
	stop() {
		this.state.running = false;
		clearInterval(this.watch);
	}
	
	resetTimer() {
		this.state.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}
	}
	
	pad0(value) {
		let result = value.toString();
		if (result.length < 2) {
			result = '0' + result;
		}
		return result;
	}
	
	render() {
		return (
			<div>
				<nav className='controls'>
					<a href='#' className='button' onClick={this.start.bind(this)}>Start</a>
					<a href='#' className='button' onClick={this.stop.bind(this)}>Stop</a>
					<a href='#' className='button' onClick={this.reset.bind(this)}>Reset</a>
				</nav>
				<div className='stopwatch'>{this.format(this.state.times)}</div>
			</div>
		);
	}
}

ReactDOM.render(<Stopwatch/>, document.getElementById('app'));

	
