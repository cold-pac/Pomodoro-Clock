(this["webpackJsonppomodoro-clock"]=this["webpackJsonppomodoro-clock"]||[]).push([[0],{10:function(e,t,n){e.exports=n(11)},11:function(e,t,n){"use strict";n.r(t);var i,a=n(7),s=n(3),r=n(4),o=n(8),c=n(5),m=n(1),l=n(9),d=n(0),u=n.n(d),h=n(6),g=n.n(h);function p(e){return 1===e.toString().length?0+e.toString():e}var k=function(e){return u.a.createElement("div",{className:"control",id:e.elementId,onClick:e.onClick},e.contents)},b=function(e){function t(e){var n;return Object(s.a)(this,t),(n=Object(o.a)(this,Object(c.a)(t).call(this,e))).state={remainingTime:1500,breakLength:300,sessionLength:1500,timerLabel:"Session",state:"Stopped",oppositeState:"Start",pomodoroNum:[]},n.toggleTimer=n.toggleTimer.bind(Object(m.a)(n)),n.decreaseBreak=n.decreaseBreak.bind(Object(m.a)(n)),n.increaseBreak=n.increaseBreak.bind(Object(m.a)(n)),n.decreaseSession=n.decreaseSession.bind(Object(m.a)(n)),n.increaseSession=n.increaseSession.bind(Object(m.a)(n)),n.resetTime=n.resetTime.bind(Object(m.a)(n)),n}return Object(l.a)(t,e),Object(r.a)(t,[{key:"startTimer",value:function(){var e=this;i=setInterval((function(){e.setState((function(e,t){return{remainingTime:e.remainingTime-1}})),e.state.remainingTime<0&&(window.Tone.Transport.start(),window.stopTransport(),"Session"===e.state.timerLabel?e.state.pomodoroNum.length<4?e.setState((function(e,t){return{remainingTime:e.breakLength,timerLabel:"Break",pomodoroNum:[].concat(Object(a.a)(e.pomodoroNum),[e.pomodoroNum.length])}})):e.setState({timerLabel:"Elongated Break",remainingTime:1200,pomodoroNum:[]}):e.setState((function(e,t){return{remainingTime:e.sessionLength,timerLabel:"Session"}})),console.log(e.state.pomodoroNum))}),1e3)}},{key:"stopTimer",value:function(){clearInterval(i),i=!1}},{key:"toggleTimer",value:function(){"Stopped"===this.state.state?(this.startTimer(),this.setState({state:"Started",oppositeState:"Stop"})):(this.stopTimer(),this.setState({state:"Stopped",oppositeState:"Start"}))}},{key:"decreaseBreak",value:function(){i||(this.setState((function(e,t){if(e.breakLength>60)return{breakLength:e.breakLength-60}})),this.updateTimer())}},{key:"increaseBreak",value:function(){i||(this.setState((function(e,t){if(e.breakLength<3600)return{breakLength:e.breakLength+60}})),this.updateTimer())}},{key:"updateTimer",value:function(){"Session"===this.state.timerLabel?this.setState((function(e,t){return{remainingTime:e.sessionLength}})):this.setState((function(e,t){return{remainingTime:e.breakLength}}))}},{key:"decreaseSession",value:function(){i||(this.setState((function(e,t){if(e.sessionLength>60)return{sessionLength:e.sessionLength-60}})),this.updateTimer())}},{key:"increaseSession",value:function(){i||(this.setState((function(e,t){if(e.sessionLength<3600)return{sessionLength:e.sessionLength+60}})),this.updateTimer())}},{key:"resetTime",value:function(){this.setState({remainingTime:1500,breakLength:300,sessionLength:1500,timerLabel:"Session",state:"Stopped",oppositeState:"Start"}),this.stopTimer()}},{key:"render",value:function(){var e={color:"#A0A0FF"};return this.state.remainingTime<=10?e.color="red":e.color="#A0A0FF",u.a.createElement("div",{id:"container"},u.a.createElement("h1",null,u.a.createElement("span",null,"****"),u.a.createElement("span",null,"Pomodoro Clock"),u.a.createElement("span",null,"****")),u.a.createElement("div",{id:"pomodoros"},this.state.pomodoroNum.map((function(e,t){return u.a.createElement("span",{key:t},"+")}))),u.a.createElement("div",{id:"options"},u.a.createElement("div",{id:"break"},u.a.createElement("div",{id:"break-label"},"Break Length:"),u.a.createElement("div",{className:"info",id:"breakinfo"},u.a.createElement(k,{elementId:"break-decrement",onClick:this.decreaseBreak,contents:"-"}),u.a.createElement("div",{id:"break-length"},this.state.breakLength/60),u.a.createElement(k,{elementId:"break-increment",onClick:this.increaseBreak,contents:"+"}))),u.a.createElement("div",{id:"session"},u.a.createElement("div",{id:"session-label"},"Session Length:"),u.a.createElement("div",{className:"info",id:"sessioninfo"},u.a.createElement(k,{elementId:"session-decrement",onClick:this.decreaseSession,contents:"-"}),u.a.createElement("div",{id:"session-length"},this.state.sessionLength/60),u.a.createElement(k,{elementId:"session-increment",onClick:this.increaseSession,contents:"+"})))),u.a.createElement("div",{id:"timerContainer"},u.a.createElement("div",{id:"timer-label",style:e},this.state.timerLabel),u.a.createElement("div",{id:"time-left",style:e},p(Math.floor(this.state.remainingTime/60))+":"+p(this.state.remainingTime%60)),u.a.createElement("div",{id:"buttons"},u.a.createElement(k,{elementId:"start_stop",onClick:this.toggleTimer,contents:this.state.oppositeState}),u.a.createElement(k,{elementId:"reset",onClick:this.resetTime,contents:"Reset"}))))}}]),t}(u.a.Component);g.a.render(u.a.createElement(b,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.0cb656ed.chunk.js.map