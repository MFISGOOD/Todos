import React , {Component} from 'react';

export class Logout extends Component{
  componentWillMount(){
    this.props.logOut();
  }
  render(){
    return(
      <div className="container" >
       <h1>you are logged out now...</h1>
      </div>
    //  <Redirect to="/login" />
    );
  }
}