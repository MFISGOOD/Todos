import React, {Component} from 'react';
import  {Route, Link, Switch , BrowserRouter,Redirect }  from 'react-router-dom';
import Login from '../views/Login.jsx';
import Register from '../views/Register.jsx';
import TaskList from '../views/TaskList.jsx';
import NotFound from '../views/NotFound.jsx';
// import { Session } from 'meteor/session';
import {Tracker} from 'meteor/tracker';
import { Accounts } from 'meteor/accounts-base';
import {Tasks} from '../../lib/collections/tasks.js';
import {TotalRecords} from '../../lib/collections/tasks.js';
import { withTracker } from 'meteor/react-meteor-data';

class Logout extends Component{
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
class AppFooter extends Component{
  constructor(props){
    super(props);

  }
  handleGetPage(event){
    this.props.getPage(event.target.id);
  }

  render(){
    let nbrePages= parseInt(this.props.nbreOfRecords/this.props.limit);
    nbrePages+= (this.props.nbreOfRecords%this.props.limit == 0) ? 0 : 1;
    let links=[];
    for (let i = 0; i < nbrePages; i++) {
      if(i== this.props.currentPage){
        links[i]=<a key={i} id={i} className="pagination disabled" onClick={this.handleGetPage.bind(this)}>{i}</a>;
      }else{
        links[i]=<a key={i} id={i} className="pagination" onClick={this.handleGetPage.bind(this)}>{i}</a>;
      }

    }

    return(
      <div className="container bg-primary">
        <div className="row">
          {
            links
          }
        </div>

       </div>
    );
  }
}
class AppHeader extends Component{
 handleSearchForm(event){
   event.preventDefault();
   this.props.handleSearch(this.refs.searchInput.value);
 }
 handleSearchInput(event){
   this.props.handleSearch(event.target.value);
 }
 handleCompletedTasks(event){
   this.props.showCompletedTask(event.target.checked);
 }
  render(){
    return(
       <nav className="navbar bg-primary container">
         <ul className="nav navbar-nav navbar-left">
          <li>
        </li>
          <li><form className="" onSubmit={this.handleSearchForm.bind(this)} id="search">
            <input  type="text" name="search" ref="searchInput" placeholder="Search.." onChange={this.handleSearchInput.bind(this)}/>
          </form></li>
            </ul>
          <ul className="nav navbar-nav navbar-right" >
            <li style={{textAlign:'right'}}>
              <div className="my-dropdown">
                <a className=" logiLink" type="" data-toggle="dropdown" ><span className="caret"></span> {this.props.loginLabel}
                </a>
                <ul className="my-dropdown-content">
                  <li><a href="/register" className={this.props.loggedIn ? "disabled": ""  }>Sign Up <span className="glyphicon glyphicon-user" >
                    </span></a>
                  </li>
                  <li><a href="/login" className={this.props.loggedIn ? "disabled" : "" } >Login <span className="glyphicon glyphicon-log-in" ></span></a>
                  </li>
                  <li ><hr/></li>
                  <li><a href="/logout" className={this.props.loggedIn ?  "" :"disabled" }>Log out <span className="glyphicon glyphicon-log-out" ></span></a></li>
                </ul>
              </div>
              <div>
                <label className="checkbox-inline">
                 <input type="checkbox" value="" onChange={this.handleCompletedTasks.bind(this)}/> Hide Completed Tasks
                </label>
              </div>
            </li>
          </ul>
       </nav>

    );
  }
}

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
   }
   this.callbackSignin=this.callbackSignin.bind(this);

 }

componentWillMount(){
  //  Meteor.call('getTotalTasks',function(err,res){
  //    Session.set('nbrePages',res);
  //  });
  Tracker.autorun((computation) => {
    Session.set('page',0);
    if (Meteor.userId()) {
      this.setState({
        currentPath:'/',
      });

    }else{
      this.setState({
        currentPath:'/login',
      });
    }

  });
}
componentDidMount(){
  this.setState({
    currentPath:window.location.pathname,
  });
  Meteor.call('getTotalTasks',function(err,res){
    if(err){

    }else{
    }
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
handleSignUp(userData){
   if(!Meteor.userId()){
     Accounts.createUser(userData, function(err,res){
       if(err){
         console.log(err.reason);
       }else{
         console.log(`The user [ email: ${userData.email},passwor: ${userData.password} ] has been created `);
         window.history.pushState(null,null,'/');
         this.state={
           currentPath:'/',
           loggedIn:true,
           loginLabel:this.props.user?this.props.user.emails[0].address : 'Login',
         }
       }
     });
   }
  // todo
}//handleSignUp
callbackSignin(err,res){
  if(err){
    console.log(err.reason);
  }else{
    Session.set('login',true);
    this.setState({
      currentPath:'/',
      loggedIn:true,
      loginLabel:this.props.user?this.props.user.emails[0].address : 'Login',
    });

    window.history.pushState(null,null,'/');
  }
}
handleSignIn(user,password){
  if(!this.state.login){
    Meteor.loginWithPassword(user,password,this.callbackSignin);
  }
}
getMainContainer(){
    let main;
    if(Meteor.userId()){
      switch(this.state.currentPath) {
         case "/":
           main=<TaskList
                 tasks={this.props.tasks}
                 addTask={this.handleAddTask.bind(this)}
                 deleteTask={this.handleDeleteTask.bind(this)}
                 updateTask={this.handleUpdateTask.bind(this)}
                 filter={this.state.filter}
                 isCompleted={this.state.completed}
                />;
             break;
         case "/logout":
           main=<Logout logOut={this.handleLogOut.bind(this)}/>;
             break;
         default:
           main=<NotFound />;
       }
    }else{

      switch(this.state.currentPath) {
        case "/"  : ;
         case "/login":
           main=<Login
               signIn={this.handleSignIn.bind(this)}
             />;
              break;
         case "/register":
           main=<Register
             signUp={this.handleSignUp.bind(this)}
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
handleAddTask(task){
  Meteor.call('add-task',task,function(err,res){
    if(err){
      throw new Meteor.Error(err);
    }else {
      console.log(`the task {content:${task.content},checked:${task.checked}} has been added with success.`)
      // Meteor.call('getTotalTasks',function(err,res){
      //   Session.set('nbrePages',res);
      // });
    }
  });
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
      // Meteor.call('getTotalTasks',function(err,res){
      //   Session.set('nbrePages',res);
      // });
    }
  });
}
getPage(number){
  Session.set('page',number);
  // this.setState({
  //   currentPage:number,
  // });
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
           {this.getMainContainer()}
      </div> {/* App main*/}
      <div className="app-footer">
        <AppFooter
          nbreOfRecords={this.props.nbreOfRecords}
          limit={10}
          currentPage={this.props.currentPage}
          getPage={this.getPage.bind(this)}
        />
      </div>
    </div>
  );
}
}
export default  withTracker((user,tasks,page,nbreOfRecords) => {
   Meteor.call('getTotalTasks',function(err,res){
    Session.set('nbreOfRecords',res);
   });
   let limit=10;
   page=Session.get('page')*limit;
   user = Meteor.user();
   const label=user ? user.emails[0].address: ' Login';
   const tasksHandle = Meteor.subscribe('tasks');
   const nbreOfRecordsHandle=Meteor.subscribe('totalRecords');
   const loading = !tasksHandle.ready();
   tasks = user ? Tasks.find({},{limit:limit,skip:page}).fetch():null;
   nbreOfRecords= Tasks.find({}).count();
   const listExists = !loading && !!tasks;
   return {
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
