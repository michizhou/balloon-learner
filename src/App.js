import React, { Component } from 'react';
import { Router, Route, Switch} from 'react-router'
import { Link } from 'react-router-dom'
import './App.scss';
import RedBalloon from './balloons/RedBalloon'
import Timer from './Timer'
import YouLose from './balloons/YouLose'
import Maths from './modes/Maths'
import Words from './modes/Words'
import Landing from './Landing'
import Instruction from './Instruction'
import { createBrowserHistory } from 'history';

import img from './assets/balloon-logo-two.png'

import $ from 'jquery'

const history = createBrowserHistory();

// Get the current location.
const location = history.location;

var interval = ''

class App extends Component {

  state = {
    linkClicked: false,
    showInstructions: true,
    debug: false,
    outputTop: 0
  }

  componentDidMount = () =>{

    this.checkUrl()

  }

  checkInstructions = () =>{
    if (location.pathname.indexOf("Words") > -1){
      this.applyInstructions("Words")
    } else {
      this.applyInstructions("Math")
    }
  }

  applyInstructions = (x) =>{

    this.setState({
      message: x
    })
  }

  checkUrl = () =>{
    history.listen((location, action) => {
      setTimeout(()=>{
        if (window.location.href.indexOf("Math") > -1 || window.location.href.indexOf("Words") > -1){
          this.handleLinkClick()
          this.applyInstructions('Balloon Learning')
        } else {
          this.setState({
            outputTop: 0
          })
          this.handleLinkClick()
          this.checkInstructions()
        }
      }, 0)
    })
  }

  handleLinkClick = () =>{
    setTimeout(()=>{
      if (window.location.href.indexOf("Math") > -1 || window.location.href.indexOf("Words") > -1){
        this.setState({
          linkClicked: true
        })
      } else {
        this.setState({
          linkClicked: false
        })
      }
    }, 0)
  }

  removeInstruction = () =>{

    this.setState({
      showInstructions: false
    })
  }

  boomBoom = (actualX,actualY, e) => {

    var targ

    if (e.target.classList.value == 'spanDiv'){
      targ = e.target.parentElement.parentElement
    } else if (e.target.classList.value.includes('Balloon')){
      targ = e.target.parentElement
    } else if (e.target.classList.value.includes('balSpan')){
      targ = e.target.parentElement.parentElement.parentElement
    }

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');

    if (targ){
         // Shim with setTimeout fallback

      	var laX = actualX;
      	var laY = actualY - 100;
      	var W = canvas.width = window.innerWidth;
      	var H = canvas.height = window.innerHeight;
      	// Let's set our gravity
      	var gravity = 2.3;

      	// Time to write a neat constructor for our
      	// particles.
      	// Lets initialize a random color to use for
      	// our particles and also define the particle
      	// count.
      	var particle_count = 30
      	var particles = [];

        var colors = [`${targ.children[0].classList[1].split("B")[0]}`];
      	var random_color = colors[Math.floor(Math.random() * colors.length)];

          // event.target.style.display = 'none'

      	function Particle() {
      		this.radius = parseInt(Math.random() * 10);
      		this.x = actualX;
      		this.y = actualY - 100;

      		this.color = random_color;

      		// Random Initial Velocities
      		this.vx = Math.random() * 20 - 10;
      		// vy should be negative initially
      		// then only will it move upwards first
      		// and then later come downwards when our
      		// gravity is added to it.
      		this.vy = Math.random() * -20 - 1;

      		// Finally, the function to draw
      		// our particle
      		this.draw = function() {
      			ctx.fillStyle = this.color;

      			ctx.beginPath();

      			// ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
            ctx.rect(this.x, this.y, Math.floor(Math.random() * 10) + 1  , Math.floor(Math.random() * 10) + 1  );
      			ctx.fill();

      			ctx.closePath();
      		};
      	}

      	// Now lets quickly create our particle
      	// objects and store them in particles array
      	for (var i = 0; i < particle_count; i++) {
      		var particle = new Particle();
      		particles.push(particle);
      	}

      	// Finally, writing down the code to animate!
      	(function renderFrame() {
      		requestAnimationFrame(renderFrame);

      		// Clearing screen to prevent trails
      		ctx.clearRect(0, 0, W, H);

      		particles.forEach(function(particle) {

      			// The particles simply go upwards
      			// It MUST come down, so lets apply gravity
      			particle.vy += gravity;

      			// Adding velocity to x and y axis
      			particle.x += particle.vx;
      			particle.y += particle.vy;

      			// We're almost done! All we need to do now
      			// is to reposition the particles as soon
      			// as they move off the canvas.
      			// We'll also need to re-set the velocities

      			particle.draw();

      		});
      	}());
    }

  };

  componentWillMount = () =>{
    var boomBoom = this.boomBoom
    $(document).ready(function(){
       $('body').click(function(e){
          boomBoom(e.pageX , e.pageY, e);
       });
    })

    window.requestAnimationFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||function(f){window.setTimeout(f,1e3/60)}}();
    this.handleLinkClick()
  }

  render() {

    const maths = "Math"

    let outputTop

    if (window.location.href.indexOf("Math") > -1 || window.location.href.indexOf("Words") > -1){
      outputTop = 100
    } else {
      outputTop = 0
    }

    return (
      <div className="App">
        {this.state.debug
          ? <div style={{position: 'fixed', top: 0 + 'px', left: 0 + 'px', right: 0 + 'px', bottom: 0 + 'px', zIndex: 1004, backgroundColor: 'white'}}><iframe src="https://giphy.com/embed/HY8vXhS3hNW3S" width="480" height="360" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/cheezburger-fail-ouch-HY8vXhS3hNW3S">via GIPHY</a></p>
          <h1>We're working on it...</h1>
        </div>
          :null
        }
        {this.state.showInstructions
          ?<Instruction removeInstruction={this.removeInstruction} message={`Welcome to ${this.state.message}! Are you ready to learn?`}/>
          : null
        }

          <canvas id="output" style={{top: outputTop + 'px'}}></canvas>

        <div className="nav">
          <div className="first-nav-div">
          <Link className="nav-link" to="/" onClick={this.handleLinkClick}><img className="balloonLightLogo" src={img}/></Link>
          <h1 className="nav-link-h1" style={{color: 'black', marginTop: 'auto'}} onClick={this.handleLinkClick}>Balloon Learning</h1>
          </div>
          {this.state.linkClicked
            ? <div className="nav-link-container">
                <Link className="nav-link-lower" to="/Math" onClick={this.handleLinkClick}><li>{maths}</li></Link>
                <Link className="nav-link-lower" to="/Words" onClick={this.handleLinkClick}><li>Words</li></Link>
              </div>
            : null
          }
        </div>

        <Route exact path="/" component={() => <Landing handleClick={this.handleLinkClick} history={history} checkUrl={this.checkUrl} />} onChange={this.yourHandler}/>
        <Route exact path="/Math" component={()=> <Maths checkUrl={this.applyTop}/>}/>
        <Route exact path="/Words" component={()=> <Words checkUrl={this.checkUrl}/>} />
      </div>
    );
  }
}

export default App;
