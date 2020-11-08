import React, { Component } from 'react';
import '../App.scss';
// import style from './App.less'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSkull } from '@fortawesome/free-solid-svg-icons'

library.add(faSkull)

var myInterval = ''

class RedBalloon extends Component {

  state = {
    popped: false,
    displayStyle:'block',
    visibilityDisplay: 'visible',
    operator: '',
    leftStyle: 0,
    topStyle: 0,
    timer: 0,
    animationDur: 0,
    numberOpts: [5, 10, 15, 20, 25, 50],
    colorOpts: ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'],
    colorChoice: '',
    numChoice: 0,
    id: this.props.id
  }

  componentDidMount = () =>{
    this.changeOp()
    this.randomLeft()
    this.findDiv()
  }

  refresh = () =>{
    this.setState({
      popped: false,
      displayStyle: 'none',
      visibilityDisplay: 'visible',
      operator: '',
      leftStyle: 0,
      topStyle: 0,
      timer: 0,
      animationDur: 0,
    }, ()=>{
      this.changeOp()
      this.randomLeft()
    })
  }

  changeOp = () =>{
    if (this.props.generatePlusOrMinus() === 1){
      this.setState({
        operator: '+'
      })
    } else {
      this.setState({
        operator: '-'
      })
    }
  }

  popBalloon = (e) =>{
    this.props.popBalloon(e)
    this.setState({
      popped: true
    }, ()=>{
      setTimeout(()=>{
        this.setState({
          visibilityStyle: 'hidden'
        })
      }, 200)
    })
  }

  changeNum = () =>{
    return this.state.numberOpts[Math.floor(Math.random() * this.state.numberOpts.length)]
  }

  chooseColor = () =>{
    var num = Math.floor(Math.random() * 10) + 1
    if (num === 2 ){
      return 'black'
    } else {
      return this.state.colorOpts[Math.floor(Math.random() * this.state.colorOpts.length)]
    }
  }

  randomLeft = () =>{
    var val = Math.floor(Math.random() * 10) + 10
    var leftNum

    if (window.innerWidth <= 499){
      leftNum = 250
    } else {
      leftNum = 700
    }

      this.setState({
          leftStyle: Math.floor(Math.random() * leftNum) + 1,
          colorChoice: this.chooseColor(),
          animationDur: val,
          numChoice: this.changeNum()
      })
  }

  findDiv = () =>{
    var balloonId = this.state.id
    var me = this
    setInterval(()=>{
      if (document.getElementById(`${me.props.id}`)){
        me.checkDiv(me.props.id)
      }
    }, 200)
  }

  checkDiv = (id) =>{
    var bottom = document.getElementById(`${id}`).getBoundingClientRect().bottom
    var otherBottom = document.getElementsByClassName('balContainer')[0].getBoundingClientRect().top - 120
    if (bottom < otherBottom){
      console.log(bottom)
      console.log(otherBottom)
      document.getElementById(`${id}`).style.display = 'none'
      setTimeout(()=>{
        this.refresh()
        this.randomLeft()
        if (document.getElementById(`${id}`)){
          document.getElementById(`${id}`).style.display = 'block'
        }
      }, 100)
    }
  }

  render() {

    var balloonColorClass = 'balloon ' + this.state.colorChoice + 'Balloon'

    var spanDivOpContent

    var spanDivNumContent

    if (this.state.colorChoice === 'black'){
      spanDivOpContent = ''
      spanDivNumContent = <FontAwesomeIcon icon="skull" />
    } else {
      spanDivOpContent = this.state.operator
      spanDivNumContent = this.state.numChoice
    }

    return (

        <div className='balPar' id={this.props.id} style={{visibility: this.state.visibilityDisplay, display: this.state.displayStyle, animation: `${this.state.animationDur}s ease balloon-rise`}}>

        {this.state.popped
          ? <p style={{position: 'absolute'}}></p>
          : <div className={balloonColorClass} onClick={this.popBalloon} style={{left: this.state.leftStyle}}>
              <div className="spanDiv">
                <span className="balSpanOp">{spanDivOpContent}</span>
                <span className="balSpanNum">{spanDivNumContent}</span>
              </div>
            </div>
        }
        </div>

    );
  }
}

export default RedBalloon;
