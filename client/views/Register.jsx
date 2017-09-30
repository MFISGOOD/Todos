import React, {Component} from 'react';
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
export default class Register extends Component{
  constructor(props){
    super(props);
      this.state={
        password:{
            text:"",
            length:0,
            scoreWord:'',
            scoreColor:'',
            field:{
              borderBottom:"",
            }
        },
        icode:{
          warningWord:"",
          color:'',
          borderBottom:"",
        },
        email:'',
        firstname:'',
        lastname:'',
      }
  }
  handleConfirmPasswordChange(event){
    let warningWord:"";
    let color:'';
    let borderBottom:"";
    if(this.refs.icode.value !== ""){
      if(this.refs.icode.value === this.refs.password.value)
      {
        warningWord="Match";
        color="green";
        borderBottom="2px solid green";
      }else{
        warningWord="No match";
        color="red";
        borderBottom="2px solid red";
      }
    }
    this.setState({
      icode:{
        warningWord: warningWord,
        color:color,
        borderBottom:borderBottom,
      }
    });

  }
  handlePasswordChange(event){
    let scoreWord="";
    let scoreColor="";
    let fieldBorderBottom="";
    let strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
    let mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
    let enoughRegex = new RegExp("(?=.{6,}).*", "g");
    if (event.target.value.length==0) {
    scoreWord = "";
    } else if (false == enoughRegex.test(event.target.value)) {
    scoreWord = "Short";
    } else if (strongRegex.test(event.target.value)) {
    scoreWord = "Strong!";
    fieldBorderBottom="3px solid green";
    scoreColor="green";
    } else if (mediumRegex.test(event.target.value)) {
    scoreWord = "Medium!";
    fieldBorderBottom="3px solid orange";
    scoreColor="orange";
    } else {
    scoreWord = "Weak!";
    fieldBorderBottom="3px solid red";
    scoreColor="red";
    }
    this.setState({
      password:{
          text:"",
          length:event.target.value.length,
          scoreWord:scoreWord,
          scoreColor:scoreColor,
          field:{
            borderBottom:fieldBorderBottom,
          },
      }
    });
    this.handleConfirmPasswordChange(event);
  }
  handleInputChange(event){
    this.setState({
      [event.target.name]:event.target.value,
    });
  }
  handleSubmit(event){
    event.preventDefault();
    try {
       let userData={
         password:this.refs.password.value,
         email:this.state.email,
         name: `${this.state.firstname} ${this.state.lastname}`,
        //  icode:this.refs.icode.value,
       };
      this.props.signUp(userData);
    } catch (e) {

    } finally {

    }


  }
  render(){
    return(
      <div className="Login-container">
        <div className="container">
          <div id="signupbox" style={{marginTop:50}} className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">Sign Up</div>
                        <div style={styles.signup}><a id="signinlink" href="/login" >Sign In</a></div>
                    </div>
                    <div className="panel-body" >
                        <form id="signupform" className="form-horizontal" role="form" onSubmit={this.handleSubmit.bind(this)}>
                            <div id="signupalert" style={{display:'none'}} className="alert alert-danger">
                                <p>Error:</p>
                                <span></span>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="col-md-3 control-label">Email</label>
                                <div className="col-md-9">
                                    <input type="email" className="form-control" name="email" placeholder="Email Address" value={this.state.email}
                                    onChange={this.handleInputChange.bind(this)}
                                    required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="firstname" className="col-md-3 control-label">First Name</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="firstname" placeholder="First Name" value={this.state.firstname}
                                    onChange={this.handleInputChange.bind(this)}
                                    required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastname" className="col-md-3 control-label">Last Name</label>
                                <div className="col-md-9">
                                    <input type="text" className="form-control" name="lastname" placeholder="Last Name" value={this.state.lastname}
                                    onChange={this.handleInputChange.bind(this)}
                                    required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="col-md-3 control-label">Password</label>
                                <div className="col-md-9">
                                  <div className="form-control" style={{padding:0,position:'relative'}}>
                                      <input type="password" className="form-control" name="password" placeholder="Password" style={{paddingRight:'25%',borderBottom:this.state.password.field.borderBottom}}
                                      onChange={this.handlePasswordChange.bind(this)}
                                      ref="password"
                                      required
                                      />
                                      <div style={{position: 'absolute',top:0,left:'75%',padding:5,color:this.state.password.scoreColor}}>{this.state.password.scoreWord}</div>
                                  </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="icode" className="col-md-3 control-label">Confirm password</label>
                                <div className="col-md-9">
                                  <div className="form-control" style={{padding:0,position:'relative',overflow:'auto'}}>
                                      <input type="password" className="form-control" name="icode" placeholder="Confirm password" style={{paddingRight:'25%',borderBottom:this.state.icode.borderBottom}}
                                      onChange={this.handleConfirmPasswordChange.bind(this)}
                                      ref="icode"
                                      required
                                      />
                                      <div style={{position: 'absolute',top:0,left:'75%',padding:5,color:this.state.icode.color}}
                                      >
                                        {this.state.icode.warningWord}
                                      </div>
                                  </div>
                                </div>
                            </div>
                            <div className="form-group">
                                {/*<!-- Button -->*/}
                                <div className="col-md-offset-3 col-md-9">
                                    <button id="btn-signup" type="submit" className="btn btn-info"><i className="icon-hand-right"></i>Sign Up</button>
                                    <span style={{marginLeft:8}}>or</span>
                                </div>
                            </div>
                            <div style={styles.signupwithfacebook}  className="form-group">
                                <div className="col-md-offset-3 col-md-9">
                                    <button id="btn-fbsignup" type="button" className="btn btn-primary"><i className="icon-facebook"></i>Sign Up with Facebook</button>
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
