import React, {Component} from 'react';

export class AppHeader extends Component{
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
                 <div style={{display:'none'}}>
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
   