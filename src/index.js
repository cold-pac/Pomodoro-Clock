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
    return <div className = 'control' id = {props.elementId} onClick = {props.onClick}>{props.contents}</div>
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
            oppositeState: "Start",
            pomodoroNum: [],
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
            if (this.state.remainingTime < 0)  {
                window.Tone.Transport.start(); window.stopTransport();
                if (this.state.timerLabel === "Session") {
                    if (this.state.pomodoroNum.length < 4) {
                        this.setState(function(state,props) {
                            return {remainingTime: state.breakLength, timerLabel: "Break", pomodoroNum: [...state.pomodoroNum, state.pomodoroNum.length], }
                        });
                    } else {
                        this.setState({
                            timerLabel: "Elongated Break", 
                            remainingTime: (20*60), 
                            pomodoroNum: [], 
                        });
                    }              
                } else {
                    this.setState(function(state,props) {
                        return {remainingTime: state.sessionLength, timerLabel: "Session"}
                    });
                }
                console.log(this.state.pomodoroNum);
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
            this.updateTimer();
        }
    }
    increaseBreak () {
        if (!timerInterval) {
            this.setState(function(state, props) {
                if (state.breakLength < (60*60)) {
                    return {breakLength: state.breakLength + 60}
                }
            });
            this.updateTimer();
        }
    }
    updateTimer () { //don't have to bind to 'this' because it's not being used in an event handler 
        if (this.state.timerLabel === "Session") {
            this.setState(function(state, props) {
                return {remainingTime: state.sessionLength}
            });
        } else { 
            this.setState(function(state, props) {
                return {remainingTime: state.breakLength}
            });
        }
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
            color: '#A0A0FF',
        }
        this.state.remainingTime <= 10? timerStyle.color = 'red' : timerStyle.color = '#A0A0FF';
        return (
            <div id = "container">
                <h1><span>****</span><span>Pomodoro Clock</span><span>****</span></h1>
                <div id = "pomodoros">{this.state.pomodoroNum.map((elem, i) => (<span key = {i}><img alt="pomodoro" src="./tomato.png" className = "pomodoro" /></span>))}</div>
                <div id = "options">
                    <div id = "break">
                        <div id = "break-label">Break Length:</div>
                        <div className = "info" id = "breakinfo">
                            <Control elementId = "break-decrement" onClick = {this.decreaseBreak} contents = "-" /> 
                            <div id = "break-length">{this.state.breakLength/60}</div>
                            <Control elementId = "break-increment" onClick = {this.increaseBreak} contents = "+"/> 
                        </div>
                    </div>
                    <div id = "session">
                        <div id = "session-label">Session Length:</div>
                        <div className = "info" id = "sessioninfo">
                            <Control elementId = "session-decrement" onClick = {this.decreaseSession} contents = "-"/> 
                            <div id = "session-length">{this.state.sessionLength/60}</div>
                            <Control elementId = "session-increment" onClick = {this.increaseSession} contents = "+"/> 
                        </div>
                    </div>
                </div>
                <div id = "timerContainer">
                    <div id = "timer-label" style = {timerStyle}>{this.state.timerLabel}</div>
                    <div id = "time-left" style = {timerStyle}>
                        {bloatConvert(Math.floor(this.state.remainingTime/(60))) + ':' + bloatConvert(this.state.remainingTime%60)}
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
