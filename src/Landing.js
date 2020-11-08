import React, { Component } from 'react';
import './App.scss';
import { Router, Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createBrowserHistory } from 'history';
// import { faPlus } from '@fortawesome/free-solid-svg-icons'
// import { faMinus } from '@fortawesome/free-solid-svg-icons'
// import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faBaby } from '@fortawesome/free-solid-svg-icons'
import Maths from './modes/Maths'
import Words from './modes/Words'
import TurnNumContainer from './TurnNumContainer'


import $ from 'jquery'

import balloonImg from './Artboard-1.png'


library.add(faBaby)

var interval = ''

class Landing extends Component {

  componentDidMount = () =>{

    this.props.checkUrl()



  }

  render() {



    return(
      <div className='landingContainer'>

          <Link style={{cursor: 'pointer'}} className="drop-link" to="/Math" onClick={this.props.handleClick}>
          <div className="landingBal red">
            <div className="landingBal-h1-container">
              <h1>&#43;&nbsp;&minus;</h1>

              <h1 style={{marginTop: -20 + 'px'}}>&times;&nbsp;&divide;</h1>
            </div>
          </div>
          </Link>

          <Link style={{cursor: 'pointer'}} className="drop-link" to="/Words" onClick={this.props.handleClick}>
          <div className="landingBal blue">
          <div className="landingBal-h1-container">
            <h1>ABC</h1>
            </div>
          </div>
          </Link>

          {/* <Link style={{cursor: 'pointer'}} className="drop-link" to="/Infant" onClick={this.props.handleClick}>
          <div className="landingBal green">
          <div className="landingBal-h1-container">
            <h1 style={{fontSize: 80 + 'px'}}><FontAwesomeIcon icon="baby" /></h1>
            </div>
          </div>

          </Link> */}

          <Route exact path="/Math" component={Maths}  />
          <Route exact path="/Words" component={Words} />
          {/* <Route exact path="/Infant" component={Infant} /> */}

      </div>
    )
  }
}

export default Landing;
