import React from 'react';
import ReactDOM from 'react-dom';

//Remember you're supposed to split the application into modules 
//TODO: refractor everything out as components. 

function bloatConvert (num) {
    if (num.toString().length === 1) {
        return 0 + num.toString();
    }
    return num; 
}

let timerInterval;

const Control = (props) => {
    return <div id = {props.elementId} onClick = {props.onClick}>{props.contents}</div>
}

class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            remainingTime: (25*60),  //measuring all times in seconds 
            breakLength: (5*60),
            sessionLength: (25*60), 
            timerLabel: "Session",
            state: "Stopped",
            oppositeState: "Start"
        }
        this.toggleTimer = this.toggleTimer.bind(this);
        this.decreaseBreak = this.decreaseBreak.bind(this);
        this.increaseBreak = this.increaseBreak.bind(this);
        this.decreaseSession = this.decreaseSession.bind(this);
        this.increaseSession = this.increaseSession.bind(this);
        this.resetTime = this.resetTime.bind(this);
    }
    startTimer () {
        timerInterval = setInterval(() => {
            this.setState(function(state, props){
                return {remainingTime: (state.remainingTime - 1)}
            });
            if (this.state.remainingTime === 0)  {
                window.Tone.Transport.start(); window.stopTransport();
                if (this.state.timerLabel === "Session") {
                    this.setState(function(state,props) {
                        return {remainingTime: state.breakLength, timerLabel: "Break"}
                    });
                } else {
                    this.setState(function(state,props) {
                        return {remainingTime: state.sessionLength, timerLabel: "Session"}
                    });
                }
            }
        }, 1000);
    }
    stopTimer () {
        clearInterval(timerInterval);
        timerInterval = false;
    }
    toggleTimer () {
        if (this.state.state === "Stopped") {
            this.startTimer();
            this.setState({
                state: "Started",
                oppositeState: "Stop"
            });
        } else {
            this.stopTimer();
            this.setState({
                state: "Stopped",
                oppositeState: "Start"
            });
        }
    }
    decreaseBreak () {
        if (!timerInterval) {
            this.setState(function(state, props) {
                if (state.breakLength > (1*60)) {
                    return {breakLength: state.breakLength - 60}
                }
            });
        }
    }
    increaseBreak () {
        if (!timerInterval) {
            this.setState(function(state, props) {
                if (state.breakLength < (60*60)) {
                    return {breakLength: state.breakLength + 60}
                }
            });
        }
    }
    updateTimer () { //don't have to bind to 'this' because it's not being used in an event handler 
        this.setState(function(state, props) {
            return {remainingTime: state.sessionLength}
        });
    }
    decreaseSession () {
        if (!timerInterval) {
            this.setState(function(state, props) {
                if (state.sessionLength > (1*60)) {
                    return {sessionLength: state.sessionLength - 60}
                }
            });
            this.updateTimer();
        }
    }
    increaseSession () {
        if (!timerInterval) {
            this.setState(function(state, props) {
                if (state.sessionLength < (60*60)) {
                    return {sessionLength: state.sessionLength + 60}
                }
            });
            this.updateTimer();
        }
    }
    resetTime () {
        this.setState({
                remainingTime: (25*60),
                breakLength: (5*60),
                sessionLength: (25*60), 
                timerLabel: "Session",
                state: "Stopped",
                oppositeState: "Start"
        });
        this.stopTimer();
    }
    render () {
        let timerStyle = {
            color: 'black',
        }
        this.state.remainingTime <= 10? timerStyle.color = 'red' : timerStyle.color = 'black';
        return (
            <div id = "container">
                <h1>Pomodoro Clock</h1>
                <div id = "options">
                    <div id = "break-label">Break Length (mins)</div>
                    <div id = "break-length">{this.state.breakLength/60}</div>
                    <Control elementId = "break-decrement" onClick = {this.decreaseBreak} contents = "-" /> 
                    <Control elementId = "break-increment" onClick = {this.increaseBreak} contents = "+"/> 
                    <div id = "session-label">Session Length (mins)</div>
                    <div id = "session-length">{this.state.sessionLength/60}</div>
                    <Control elementId = "session-decrement" onClick = {this.decreaseSession} contents = "-"/> 
                    <Control elementId = "session-increment" onClick = {this.increaseSession} contents = "+"/> 
                </div>
                <div id = "timerContainer">
                    <div id = "timer-label">{this.state.timerLabel}</div>
                    <div id = "time-left" style = {timerStyle}>
                        {bloatConvert(Math.floor(this.state.remainingTime/(60)))} : {bloatConvert(this.state.remainingTime%60)}
                    </div>
                    <div id = "buttons">
                        <Control elementId = "start_stop" onClick = {this.toggleTimer} contents = {this.state.oppositeState}/> 
                        <Control elementId = "reset" onClick = {this.resetTime} contents = "Reset" /> 
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
