import React, { Component } from "react";

export class Redirect extends Component {
  constructor( props ){
    super();
    this.state = { ...props };
  }
  componentWillMount(){
    window.location = `${this.props.route.loc}${this.props.location.pathname}`;
  }
  render(){
    return (<section>Redirecting...</section>);
  }
}

export default Redirect;