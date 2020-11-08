import React, { Component } from 'react';
import './App.scss';
// import style from './App.less'

class Timer extends Component {

  state = {
    time: 0
  }

  componentDidMount = () =>{
    this.calcTime(this.props.time)
  }

  calcTime = (data) =>{
    var sec_num = parseInt(data, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
  }

  render() {

    return(
      <button className={this.props.passedClassName}>{this.props.time}</button>
    )
  }
}

export default Timer;
