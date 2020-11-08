import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import '../App.scss';
// import style from './App.less'
import WordBalloon from '../balloons/WordBalloon'
import Letter from '../balloons/Letter'
import Timer from '../Timer'
import YouLose from '../balloons/YouLose'

import $ from 'jquery'

var interval = ''

class Words extends Component {

  state ={
    total: 0,
    start: false,
    time: 0,
    finalTime: 0,
    myVar: '',
    timerClass: 'timer',
    lost: false,
    passedTotal: 0,
    underConstruction: false,
    words: ['YES', 'NO', 'MAYBE'],
    wordInput: '',
    word: ['N', 'O'],
    letters: [{letter: 'N', className: 'letter'}, {letter: 'O', className: 'letter'}]
  }

  startTime = () =>{
    this.setState({
      time: this.runTimer()
    })
  }

  componentDidMount = () =>{

    this.setState({
      word: this.generateWord(),
    }, ()=>{
      this.setState({
        letters: this.setLetters(this.state.word)
      })
    })
  }

  setLetters = (data) => {
    var newLetters = data.map((letter)=>{
      var obj = {}
      obj['letter'] = letter
      obj['className'] = 'letter'
      return obj
    })
    return newLetters
  }

  generateWord = () =>{
    return this.state.words[Math.floor(Math.random() * this.state.words.length)].split('')
  }

  newWord = () =>{
    this.setState({
      word: this.generateWord(),
    }, ()=>{
      this.setState({
        letters: this.setLetters(this.state.word)
      })
    })
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
      this.searchLetters(balloon.children[0].children[1].innerText)
    }
  }

  searchLetters = (data) =>{
    var num
    var newLetter = this.state.letters.find((letter, index)=>{
      if (letter.letter === data){
        this.calcPoints()
        num = index
        letter['className'] = 'letter found'
        return letter
      }
    })
    this.setState({
      letters: this.state.letters
    })
    this.checkAllLetters()
  }

  checkAllLetters = () =>{

    var classNames = this.state.letters.map((letter)=>{
      return letter.className
    })
    if (classNames.includes("letter found")){
      var uniqueClasses = [...new Set(classNames)]
      if (uniqueClasses.length === 1){
        alert("you won! But I haven't built that feature so it's going to say you lost but you definitely didn't lose you're great I just...")
        this.youLose()
      }
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
    }, 2000)})
  }

  youLose = () =>{
    this.setState({
      lost: true,
      passedTotal: this.state.total
    })
    this.restart()
  }

  calcPoints = () =>{

      this.setState({
        total: this.state.total + 5
      })
  }

  restart = () =>{
    var clearTimer = this.state.myVar
    this.setState({
      finalTime: this.calcTime(this.state.time),
      start: false,
      total: 0,
      time: 0,
      wordInput: []
    }, ()=>{
      clearInterval(clearTimer)
    })
    this.newWord()
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
    var time = this.calcTime(this.state.time)
    var startBtnAction;
    var startBtntext;
    var startClass;
    var letterClass = 'letter'
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
      <div className="Infant">

        {this.state.underConstruction
          ? <div><h1>WORDS</h1><p>(under construction)</p></div>
          : null
        }
        {this.state.lost
          ? <YouLose finalTime={this.state.finalTime} finalScore={this.state.passedTotal} onClick={this.onStart}/>
          : null
        }

        {!this.state.underConstruction
          ? <div>
          <div style={{height: 100 + 'px', width: 80 + '%', maxWidth: 1500 + 'px', display: 'block', margin: 'auto', position: 'relative' }}>
          <Timer time={time} passedClassName={this.state.timerClass}/>
          <div className="headContainer">
            <div className={startClass} onClick={startBtnAction}>{startBtntext}</div>
            <div className="balTotal">SCORE: {this.state.total}</div>
          </div>
        </div>

        <div className="parentBalContainer">

           <div className="balContainer">
             <div className="wordDiv"><h3>{
                this.state.letters.map((letter, index)=>{
                   return <Letter className={letter.className} key={index} word={this.state.word} letter={letter.letter}/>
                })
               }</h3></div>
             {this.state.start
               ? <div>
                   <WordBalloon id='balloon1' popBalloon={this.popBalloon} word={this.state.word}/>
                   <WordBalloon id='balloon2' popBalloon={this.popBalloon} word={this.state.word}/>
                   <WordBalloon id='balloon3' popBalloon={this.popBalloon} word={this.state.word}/>
                   <WordBalloon id='balloon4' popBalloon={this.popBalloon} word={this.state.word}/>
                   <WordBalloon id='balloon5' popBalloon={this.popBalloon} word={this.state.word}/>
                   <WordBalloon id='balloon6' popBalloon={this.popBalloon} word={this.state.word}/>
                   <WordBalloon id='balloon7' popBalloon={this.popBalloon} word={this.state.word}/>
                </div>
            : null
          }
          </div>

        </div>
        </div>
        : null
      }

      </div>
    );
  }
}

export default Words;
//
// <WordBalloon id='balloon2' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <WordBalloon id='balloon3' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon4' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon5' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon6' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
// <RedBalloon id='balloon7' popBalloon={this.popBalloon} generatePlusOrMinus={this.generatePlusOrMinus}/>
