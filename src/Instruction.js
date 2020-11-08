import React, { Component } from 'react';
import './App.scss';
import { Router, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import smileBal from './assets/balloon-smile.png'
import sillyBal from './assets/silly-balloon.png'
import disBal from './assets/dissapointed-balloon.png'
import scarredBal from './assets/scared-balloon.png'
import scarredTwoBal from './assets/scared-balloon-2.png'

import { connect } from 'react-redux'

import {
  withRouter,
  // Link,
  // Route,
} from 'react-router-dom';

import $ from 'jquery'

var interval = ''
class Instruction extends Component {

  state = {
    disableInstructions: true
  }

  removeInstruction = () =>{
    this.props.removeInstruction()

  }

  componentDidMount = () =>{
    this.setState({
      disableInstructions: this.props.disable
    })
  }
  chooseText = () =>{

  }

  render() {



    return(

      <div className='instructionOuterContainer'>
          <div className='instructionModalBackground'></div>
          <div className='bubbleContainer'>
          <div className="speech-bubble">
            <p>Welcome to Balloon Learning! Are you ready to learn?</p>
          </div>
          </div>
          <div className='instructionContainer'>
            <img className="balloonBuddy" src={smileBal} onClick={this.removeInstruction}/>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {

  return {
    disableInstructions: state.appReducer.disableInstructions
  }
}

export default withRouter(connect(mapStateToProps)(Instruction))
