import React, { Component } from 'react';
import '../App.scss';

class Letter extends Component {

  state = {
    passedWord: '',
    found: false,
    className: 'letter'
  }

  componentDidMount = () =>{

    this.setState({
      passedWord: this.props.word,
      className: this.props.className
    })
  }

  render() {

    return(
      <p className={this.props.className}>{this.props.letter}</p>
    )
  }
}

export default Letter;
