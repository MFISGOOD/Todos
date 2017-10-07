import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';
export default class NotFound extends Component{
  render(){
    return(
      <div className="NotFound-container container">
        <h2>Page {window.location.href} not found </h2>
        {
          Meteor.userId() ?
            <div className="notfound-help-links">
              <h3>the existed pages are:</h3>
              <ul>
                <li><a href="/">{window.location.host}</a></li>
                <li><a href="/logout">{window.location.host}/logout</a></li>
              </ul> 
            </div>
          :
            <div className="notfound-help-links">
              <h3>the existed pages are</h3>
              <ul>
                <li> <a href="/login">{window.location.host}/login</a></li>
                <li>  <a href="/register">{window.location.host}/register</a></li>
              </ul>
            </div>    
         }
      </div>
    );
  }
}
