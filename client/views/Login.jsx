import React, {Component} from 'react';
import {Meteor} from 'meteor/meteor';

const styles={
    forgotpassword :
    {
         float: 'right',
         fontSize: '80%',
         position: 'relative',
         top:-10
    },
    signup :
    {
        float: 'right',
        fontSize: '85%' ,
        position: 'relative',
        top:-10
    },
    signupwithfacebook:{
       borderTop: '1 solid #999',
       paddingTop:20,
    },
    donthaveanaccount:{
      borderTop: '1 solid #888',
      paddingTop:15,
      fontSize:'85%'
    }

}


export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      i:'',
      s:'',
    }
  }
  handleSubmit(event){
    event.preventDefault();
     this.props.signIn(this.state.i,this.refs.password.value);
  }
  handleUserNameChange(event){
    this.setState({
      i: event.target.value,
    });
  }
  handlePasswordChange(event){
    this.setState({
      s:Accounts._hashPassword(event.target.value),
    });
  }

  render(){
    return(
      <div className="Register-container">
        <div className="container">
          <div id="loginbox" style={{marginTop:50}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <div className="panel panel-info" >
                <div className="panel-heading">
                    <div className="panel-title">Sign In</div>
                    <div style={styles.forgotpassword}><a href="#">Forgot password?</a></div>
                </div>
                <div style={{paddingTop:30}} className="panel-body" >
                    <div style={this.props.error? {} : {display:'none'} } id="login-alert" className="alert alert-danger col-sm-12">
                    {this.props.error || "" }
                    </div>
                    <form id="loginform" className="form-horizontal" role="form" onSubmit={this.handleSubmit.bind(this)}>
                           <div style={{marginBottom: 25}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                                    <input id="login-username" type="text" className="form-control" name="username"  placeholder="username or email" ref="username" onChange={this.handleUserNameChange.bind(this)}
                                    required
                                    />
                           </div>
                           <div style={{marginBottom: 25}} className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                                    <input id="login-password" type="password" className="form-control" name="password" placeholder="password" ref="password" onChange={this.handlePasswordChange.bind(this)}
                                    required
                                    />

                            </div>
                            <div className="input-group">
                                  <div className="checkbox">
                                    <label>
                                      <input id="login-remember" type="checkbox" name="remember" value="1"/> Remember me
                                    </label>
                                  </div>
                            </div>
                            <div style={{marginTop:10}} className="form-group">
                                {/*<!-- Button -->*/}
                                <div className="col-sm-12 controls">
                                  <button id="btn-login" href="#" className=" btn-success" type="submit">Login  </button>
                                  <a id="btn-fblogin" href="#" className="" style={{marginLeft:10}}>Login with Facebook</a>
                                </div>
                            </div>
                            <div className="form-group ">
                                <div className="col-md-12 control">
                                    <div style={styles.donthaveanaccount} >
                                        Don't have an account!
                                    <a href="/register">
                                        Sign Up Here
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </form>
                </div>
             </div>
          </div>

        </div>
      </div>
    );
  }
}
