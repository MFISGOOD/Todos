import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import App from './components/App';

Meteor.startup(function(){
  ReactDOM.render(<App />,document.getElementById('root'));
});
