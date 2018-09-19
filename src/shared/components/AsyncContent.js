import React from "react";
import Async from "react-promise";


export default class AsyncContent extends React.Component{
  shouldComponentUpdate(){
    return false;
  }
  render(){
    return <Async {...this.props} />
  }
}