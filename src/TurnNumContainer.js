import React, { Component } from 'react';
import './App.scss';
import TurnNumInt from './TurnNumInt'
import styled, { keyframes } from 'styled-components'

const turnIntUp = keyframes`
  0%{transform: rotateX(360deg);
    color: green;
  } 100%{
    transform: rotateX(0deg);
    color: black;
  }
`
const turnIntDown = keyframes`
  0%{transform: rotateX(0deg);
    color: red;
  } 100%{
    transform: rotateX(3600deg);
    color: black;
  }
`

const TurnNumIntUp = styled.p`
  display: inline-block;
  animation: ${turnIntUp}
  `

  const TurnNumIntDown = styled.p`
    display: inline-block;
    animation: ${turnIntDown}
    `
class TurnNumContainer extends Component {

  state = {
    total: 0,
    arrTotal: [0],
    prevTotal: 0,
    prevArrTotal: [0]
  }

  splitPrevTotal = (x)=>{
    
    var arr = x
    this.setState({
      prevArrTotal: arr
    })
  }

  splitTotal = (x)=>{
      var arr = x.toString().split("")
      this.setState({
        arrTotal: arr
      })
    }

  incrementTotal = () =>{
    this.setState({
      prevTotal: this.state.total
    }, () =>{
      this.splitTotal(this.state.prevTotal)
    })
    var num = this.state.total + 1
    this.setState({
      total: num
    }, () =>{
       this.splitTotal(this.state.total)
    })
  }

  render() {

    return(
      <div>
      {this.state.prevArrTotal.map((int, i)=>{
        if (int < this.state.arrTotal[i]){
          return <TurnNumIntUp total={this.state.arrTotal[i]} key={i} int={int}>{this.state.arrTotal[i]}</TurnNumIntUp>
        } else if (int > this.state.arrTotal[i]){
          return <TurnNumIntDown total={this.state.arrTotal[i]} key={i} int={int}>{this.state.arrTotal[i]}</TurnNumIntDown>
        } else {
          return <TurnNumInt total={this.state.arrTotal[i]} key={i} int={int}/>
        }
      })}
      <button onClick={this.incrementTotal}>Click</button>
      <button onClick={this.decrementTotal}>Click</button>
      </div>
    )
  }
}

export default TurnNumContainer;
