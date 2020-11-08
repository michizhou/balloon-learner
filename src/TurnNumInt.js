import React from "react";
import './App.scss';

class TurnNumInt extends React.PureComponent {

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
      <p className={className}>{this.props.num}</p>
    );
  }
}

export default TurnNumInt;
