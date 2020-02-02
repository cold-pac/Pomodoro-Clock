import React from 'react';
import ReactDOM from 'react-dom';

//Remember you're supposed to split the application into modules 

function bloatConvert (num) {
    if (num.toString().length === 1) {
        return 0 + num.toString();
    }
    return num; 
}

let timerInterval;

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            remainingTime: (25*60),  //let's measure everything in seconds lol
            breakTime: (5*60)
        }
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
    }
    startTimer () {
        timerInterval = setInterval(() => {
            this.setState(function(state, props){
                return {remainingTime: (state.remainingTime - 1)}
            })
        }, 1000);
    }
    stopTimer () {
        clearInterval(timerInterval);
    }
    render () {
        return (
            <div id = "container">
                <h1>Pomodoro Clock</h1>
                <div id = "timerContainer">
                    <div id = "timer">
                        {Math.floor(this.state.remainingTime/(60))} : {bloatConvert(this.state.remainingTime%60)}
                    </div>
                    <div id = "buttons">
                        <button onClick = {this.startTimer}>Start</button>
                        <button onClick = {this.stopTimer}>Pause</button>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
