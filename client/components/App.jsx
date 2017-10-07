import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
//vieuws 
import Login from '../views/Login.jsx';
import Register from '../views/Register.jsx';
import TasksList from '../views/TasksList.jsx';
import NotFound from '../views/NotFound.jsx';
//collections 
import {Tasks} from '../../lib/collections/tasks.js';
import {UserSettings} from '../../lib/collections/usersettings.js';
//helpers 
import {Logout} from './helpers/Logout';
import {AppFooter} from './helpers/AppFooter';
import {AppHeader} from './helpers/AppHeader';

class App extends Component{
constructor(props){
   super(props);
   this.state={
     currentPath:'/login',
     loggedIn:false,
     loginLabel:'Login',
     filter:'',
     completed:false,
     currentPage:this.props.currentPage,
     loginError:null,
     signUpError:null,
     crudTaskError:null,
   }
   this.callbackSignin=this.callbackSignin.bind(this);

 }

componentWillMount(){
  Session.set('page',0);
  Session.set('limit',10);
}
componentDidMount(){
  this.setState({
    currentPath:window.location.pathname,
  });
}
callbackLogOut(err,res){
      if(err){
      }else{
        Session.set('login',false);
        this.setState({
          currentPath:'/login',
          loggedIn:false,
          loginLabel:'Login',
        });
        window.history.pushState(null,null,'login');
      }
}
handleLogOut(){
 if(Meteor.userId()){
   Meteor.logout(this.callbackLogOut.bind(this));
 }
}
callbackSignUp(err,res){
  if(err){
    this.setState({
     signUpError: err.reason,
    });
  }else{
    window.history.pushState(null,null,'/');
    this.setState({
      currentPath:'/',
      loggedIn:true,
      loginLabel:this.props.user?this.props.user.emails[0].address : 'Login',
      signUpError:null,
    });
  }
}
handleSignUp(userData){
   if(!Meteor.userId()){
     Accounts.createUser(userData,this.callbackSignUp.bind(this));
   }
  // todo
}//handleSignUp
callbackSignin(err,res){
  if(err){
    this.setState({
     loginError: err.reason
    });
  }else{
    Session.set('login',true);
    this.setState({
      currentPath:'/',
      loggedIn:true,
      loginLabel:this.props.user?this.props.user.emails[0].address : 'Login',
      loginError:null
    });

    window.history.pushState(null,null,'/');
  }
}
handleSignIn(user,password){
  if(!this.state.login){
    Meteor.loginWithPassword(user,password,this.callbackSignin);
  }
}
handleChangeLimit(newlimit){
 if(newlimit)
 {
    newlimit=parseInt(newlimit) || 0;
    if(newlimit <= this.props.nbreOfRecords && newlimit > 0){
      let actualLimit=this.props.settings.limit || 0;
      if(actualLimit){
       Meteor.call('update-settings',Meteor.userId(),{limit:newlimit})      
      }else{
       Meteor.call('add-settings',{limit:newlimit});
      } 
    }else{
     alert(`The value entred is not a number or is  out of the range [1 - ${this.props.nbreOfRecords}]`);
    }
 }
 else
 {
   alert("The value entred is null");
 }
}
RyanRouter(){
    let main;
    if(Meteor.userId()){
      switch(window.location.pathname) {
         case "/register":window.history.pushState(null,null,'/');
         case "/login":window.history.pushState(null,null,'/');
         case "/":
           main=<TasksList
                 tasks={this.props.tasks}
                 addTask={this.handleAddTask.bind(this)}
                 error={this.state.crudTaskError}
                 deleteTask={this.handleDeleteTask.bind(this)}
                 updateTask={this.handleUpdateTask.bind(this)}
                 filter={this.state.filter}
                 isCompleted={this.state.completed}
                 nbreOfRecords={this.props.nbreOfRecords}
                 changeLimit={this.handleChangeLimit.bind(this)}
                 settings={this.props.settings}
                 showCompletedTask={this.showCompletedTask.bind(this)}
                />;
             break;
         case "/logout":
           main=<Logout logOut={this.handleLogOut.bind(this)}/>;
             break;
         default:
           main=<NotFound />;
       }
    }else{
      switch(window.location.pathname) {
         case "/"  : window.history.pushState(null,null,'login');
         case "/logout":window.history.pushState(null,null,'login');
         case "/login":
           main=<Login
               signIn={this.handleSignIn.bind(this)}
               error={this.state.loginError}
             />;
              break;
         case "/register":
           main=<Register
             signUp={this.handleSignUp.bind(this)}
             error={this.state.signUpError}
           />;
             break;
         default:
           main=<NotFound />;
       }
    }
    return main;
}
handleSearch(filter){
   this.setState({
     filter:filter,
   });
}//handleSearchForm
showCompletedTask(isCompleted){
  this.setState({
    completed:isCompleted,
  });
}
callbackAddTask(err,res){
  if(err){
    this.setState({
      crudTaskError: err.reason,
    });
  }else{
    this.setState({
      crudTaskError: null,
    });
  }
}
handleAddTask(task){
  Meteor.call('add-task',task,this.callbackAddTask.bind(this));
}
handleUpdateTask(task_id,fields){
  Meteor.call('update-task',task_id,fields,function(err,res){
    if(err){
      console.log(err.reason);
    }else {
      console.log(`the task {content:${fields.content},checked:${fields.checked}} has been updated with success.`)
    }
  });
}
handleDeleteTask(task_id){
  Meteor.call('delete-task',task_id,function(err,res){
    if(err){
      console.log(err.reason);
    }else {
      console.log(`the task with the _id=${task_id} has been deleted with success.`)
    }
  });
}
getPage(number){
  Session.set('page',number);
}
render(){
  loginLabel=Meteor.userId() ? this.props.user?this.props.user.emails[0].address : 'Login':"Login" ;
  return(
    <div className="app-container ">
      <div className="app-header">
       <AppHeader
         handleSearch={this.handleSearch.bind(this)}
         loginLabel={this.props.loginLabel}
         loggedIn={this.props.loggedIn}
         showCompletedTask={this.showCompletedTask.bind(this)}
       />
      </div> {/* App header */}
      <div className="app-main container ">
           {this.RyanRouter()}
      </div> {/* App main*/}
      <div className="app-footer">
        <AppFooter
          nbreOfRecords={this.props.nbreOfRecords}
          limit={this.props.settings? this.props.settings.limit : 10}
          currentPage={this.props.currentPage}
          getPage={this.getPage.bind(this)}
        />
      </div>
    </div>
  );
}
}
export default  withTracker((user,tasks,page,nbreOfRecords,settings) => {
   Meteor.call('getTotalTasks',function(err,res){
    Session.set('nbreOfRecords',res);
   });
   user = Meteor.user();
   const label=user ? user.emails[0].address: ' Login';
  //  settings
   const settingsHandle=Meteor.subscribe('usersettings');
   settings = user ? UserSettings.find({}).fetch()[0]:{limit:10};
   limit= settings ? settings.limit : 10;
   page=Session.get('page')*limit;
   //end settings
   const tasksHandle = Meteor.subscribe('tasks',{},{limit:limit,skip:page});
   const loading = !tasksHandle.ready();
   tasks = user ? Tasks.find({}).fetch():null;
   nbreOfRecords= Session.get('nbreOfRecords');
   const listExists = !loading && !!tasks;
   return {
      settings,
      currentPage:Session.get('page'),
      loading,
      listExists,
      tasks: listExists ? tasks  : [],
      nbreOfRecords :  nbreOfRecords ?  nbreOfRecords : 0,
      user: user,
      loggedIn:user ? true:false,
      loginLabel: user ? label.substring(0, label.indexOf('@')) : label ,
   };
})(App);

