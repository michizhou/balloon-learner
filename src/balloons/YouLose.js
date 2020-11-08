import React, { Component } from 'react';
import '../App.scss';
// import style from './App.less'

class YouLose extends Component {

  render() {

    return(
      <div className='lostBalContainer'>
        <div className='lostBal'>
          <div className='finalDataContainer'>
              <h1 style={{display: 'block', margin: 'auto'}}>Your balloon is POPPED!</h1>
              <br/>
              <p>TIME: {this.props.finalTime}</p>
              <p>SCORE: {this.props.finalScore}</p>
              <p>LIFETIME SCORE: {this.props.finalScore}</p>
              <div className="finalPlayAgain" onClick={this.props.onClick}>
                Play Again
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default YouLose;
