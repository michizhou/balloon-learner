import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import '../App.scss';
// import style from './App.less'
import RedBalloon from '../balloons/RedBalloon'
import Timer from '../Timer'
import YouLose from '../balloons/YouLose'
import TurnNumInt from '../TurnNumInt'

import $ from 'jquery'

var interval = ''

class Maths extends Component {

  state ={
    total: 0,
    start: false,
    time: 0,
    finalTime: 0,
    myVar: '',
    timerClass: 'timer',
    lost: false,
    passedTotal: 0,
    total: 0,
    previousTotal: 0,
    truesArr: [{color: '', bool: null}]
  }

  startTime = () =>{
    this.setState({
      time: this.runTimer()
    })
  }

  componentDidMount = () =>{
    // var boomBoom = this.boomBoom
    // $(document).ready(function(){
    //    $('body').click(function(e){
    //       boomBoom(e.pageX , e.pageY, e);
    //    });
    // })
    //
    // window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(f){window.setTimeout(f,1e3/60)}}();
  }

  randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  runTimer = () =>{
      this.setState({
        time: this.state.time += 1
      })
  }

  popBalloon = (e) =>{
    var balloon

    if (e.target.className === "balSpanOp" || e.target.className === "balSpanNum" ){
      balloon = e.target.parentElement.parentElement
    } else if (e.target.className === "spanDiv") {
      balloon = e.target.parentElement
    } else if (e.target.tagName === 'svg'){
      balloon = e.target.parentElement.parentElement.parentElement
    } else {
      balloon = e.target
    }

    if (balloon == undefined || balloon.children === undefined || balloon.children[0] === undefined || balloon.children[0].children === undefined || balloon.classList.value.includes('black')){
      this.youLose()
    } else {
      var points = parseInt(balloon.children[0].children[1].innerText)
      var op = balloon.children[0].children[0].innerText
      this.calcPoints(points, op)
    }

  }

  onStart=()=>{
    this.setState({
      start: true,
      total: 0,
      myVar: setInterval(this.runTimer, 1000),
      lost: false,
      timerClass: 'timer pulsate'
    },()=>{setTimeout(()=>{
      this.setState({
        timerClass: 'timer'
      })
      // this.startBubbleMachine()
    }, 2000)})
  }

  youLose = () =>{
    this.setState({
      lost: true,
      passedTotal: this.state.total
    })
    this.restart()
  }

  calcPoints = (x, y) =>{

    let num

    if (y === "-" ){
      num = this.state.total - x
    } else {
      num = this.state.total + x
    }

    if (num < 0){
      this.setState({
        previousTotal: this.state.total,
        total: 0
      })
    } else {
      var arr = this.compare(num, this.state.total)

      // var arr = this.checkNums(num.toString().split("").reverse(), this.state.total.toString().split("").reverse())

      this.setState({
        previousTotal: this.state.total,
        total: num,
        truesArr: arr
      }, ()=>{
        console.log(this.state.truesArr)
      })
      setTimeout(()=>{
        this.setState({
          truesArr: []
        })
      }, 500)
    }
  }

  handleOnChange = () =>{
    if (this.state.total > 0){

    }
  }

  restart = () =>{
    var clearTimer = this.state.myVar
    this.setState({
      finalTime: this.calcTime(this.state.time),
      start: false,
      total: 0,
      time: 0,
    }, ()=>{
      clearInterval(clearTimer)
    })
  }

  resetStart = () =>{
    this.setState({
      start: true,
      lost: false,
      passedTotal: 0
    },()=>{setTimeout(()=>{
      this.setState({
        timerClass: 'timer'
      })
    }, 5000)})

  }

  generatePlusOrMinus = () =>{
    return Math.floor(Math.random()* 2 +1)
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

  checkNums = (a, b) =>{
    debugger
  var bNum = parseInt(b.reverse().join(""))
  var aNum = parseInt(a.reverse().join(""))

  var arr = a.map((el, i)=>{
    if (a.length === b.length){
      if (aNum < bNum && parseInt(a[i]) < parseInt(b[i])) {
        return {color: 'red', bool: false}
      } else if ( aNum > bNum && parseInt(a[i]) > parseInt(b[i])) {
        return {color: 'green', bool: true}
      } else if ((aNum < bNum && parseInt(a[i]) === parseInt(b[i])) || (aNum < bNum && parseInt(a[i]) === parseInt(b[i]))) {
        return null
      } else {
        return null
      }
    } else if (a.length > b.length){
      return true
    } else {
      return false
    }
  })
  this.setState({
    truesArr: arr
  })
}

compare(a, b) {
    const digit = i => v => Math.floor(v / Math.pow(10, i)) % 10;

    let color = a > b ? 'green' : 'red'


    return Array
        .from(
            { length: Math.ceil(Math.log10(Math.max(a, b))) },
            (_, i) =>
                ((l, r) => l === r ? {color: color, bool: null } : {color: color, bool: l > r})
                (...[a, b].map(digit(i)))
        )
        .reverse();
}

  render() {
    var time = this.calcTime(this.state.time)
    var startBtnAction;
    var startBtntext;
    var startClass;
    if (this.state.start){
      startBtnAction = this.restart
      startBtntext = 'Stop'
      startClass = 'startBtn red'
    } else {
      startBtnAction = this.onStart
      startBtntext = 'Start'
      startClass = 'startBtn green'
    }

    return (
      <div className="Maths">
        {this.state.lost
          ? <YouLose finalTime={this.state.finalTime} finalScore={this.state.passedTotal} onClick={this.onStart}/>
          : null
        }

        <div style={{height: 100 + 'px', width: 80 + '%', maxWidth: 1500 + 'px', display: 'block', margin: 'auto', position: 'relative' }}>
          <Timer time={time} passedClassName={this.state.timerClass}/>
          <div className="headContainer">
            <div className={startClass} onClick={startBtnAction}>{startBtntext}</div>
            <div className="balTotal">SCORE: {this.state.total.toString().split("").map((num, i)=>{
              return <TurnNumInt key={i} num={num} hash={this.state.truesArr[i]}/>
            })}</div>
          </div>
        </div>
        <div className="parentBalContainer">

           <div className="balContainer">
             {this.state.start
               ? <div>
                   <RedBalloon id='balloon1' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon2' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon3' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon4' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon5' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon6' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
                   <RedBalloon id='balloon7' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>

                </div>
            : null
          }
          </div>

        </div>

      </div>
    );
  }
}

export default Maths;
//
// <RedBalloon id='balloon2' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon3' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon4' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon5' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon6' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon7' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
