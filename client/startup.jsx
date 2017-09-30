import React from 'react';
import ReactDOM from 'react-dom';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import { Session } from 'meteor/session'

import App from './components/App';
Meteor.startup(function(){
  ReactDOM.render(<App />,document.getElementById('root'));
});
