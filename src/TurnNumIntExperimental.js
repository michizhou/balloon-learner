
import React, { Component } from 'react';
import './App.scss';

class TurnNumIntExperimental extends Component {

  state = {
    count: parseInt(this.props.num),
      list: [0.1, 1.1, 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0, 2.0, 1.0, 0.0, 1.2, 2.2, 3.2, 4.2, 5.2, 6.2, 7.2, 8.2, 9.2, 8.2, 7.2, 6.2, 5.2, 4.2, 3.2, 2.2, 1.2, 0.2],
      direction: null,
      current: parseInt(this.props.num),
      arrow: 'rotate(-135deg)'
  }

  componentDidMount = ()=>{
    this.setState({
      current: this.state.count,
    }, ()=>{
      document.getElementById(this.state.current.toString()).scrollIntoView()
    })
  }

  componentDidUpdate = (prevProps, prevState)=>{
     if (prevProps.num !== this.props.num){
       this.setState({
         count: parseInt(this.props.num)
       }, ()=>{
         this.updateCount(this.state.count)
       })
    }
  }

  calcCurrent = (x) =>{
    debugger
    var num
    if (x + this.state.current > 9 || x + this.state.current < 0 ){
      num = (x + this.state.current).toString().split("")[(x + this.state.current).toString().split("").length - 1]
      num = parseInt(num)
    } else {
      num = this.state.current + x
    }
    return num
  }

  calcDirection = (x) =>{
    var dir
     if (this.state.current + x > 9){
      dir = true
    } else if (this.state.current + x < 0){
      dir = false
    } else {
      dir = null
    }
    return dir
  }

  updateCount = (x) =>{

    debugger

    var dir = this.calcDirection(x)
    var num = this.calcCurrent(x)
    var arr

    var arr = x < 0 ? 'rotate(45deg)' : 'rotate(-135deg)'

    if (dir === true){
      this.setState({
        current: num + 0.2,
        arrow: arr
      },()=>{
  document.getElementById(this.state.current.toString()).scrollIntoView({behavior: "smooth", block: "end", inline: "start"})
      })
    } else if (dir === false){
    this.setState({
        current: num + 0.1,
        arrow: arr
      },()=>{
  document.getElementById(this.state.current.toString()).scrollIntoView({behavior: "smooth", block: "end", inline: "start"})
      })
    } else {
      this.setState({
        current: num,
        arrow: arr
      },()=>{
  document.getElementById(this.state.current.toString()).scrollIntoView({behavior: "smooth", block: "end", inline: "start"})
      })
    }
    debugger

    setTimeout(()=>{
      this.setState({
        current: Math.round(this.state.current)
      }, ()=>{
        debugger
  document.getElementById(this.state.current.toString()).scrollIntoView()
      })
    },300)

  }

  render() {

    const self = this;
    let className
    if (this.props.hash && this.props.hash.bool === true && this.props.hash.color === 'green'){
      className = 'greenIntUp'
    } else if (this.props.hash && this.props.hash.bool === true && this.props.hash.color === 'red') {
      className = 'redIntUp'
    } else if (this.props.hash && this.props.hash.bool === false && this.props.hash.color === 'green') {
      className = 'greenIntDown'
    } else if (this.props.hash && this.props.hash.bool === false && this.props.hash.color === 'red') {
      className = 'redIntDown'
    } else {
      className = 'normInt'
    }
    return (
      <div className="intContainer">
        <div className="numContainer">
          {this.state.list.map((int, i)=>{
            return <p key={i} id={int.toString()} className={className} style={{fontSize: 30 + 'px'}}>{Math.round(int)}</p>
            })}
        </div>
      </div>
    );

  }
}

export default TurnNumIntExperimental;
