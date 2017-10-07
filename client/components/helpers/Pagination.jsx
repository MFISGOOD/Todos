import React ,{Component} from 'react';
export default class Pagination extends Component {
  constructor(props){
    super(props);
    this.state={
      min:1,
      max:10,
      nbreOfLinks:this.props.nbreOfLinks || 10,
    };
  }
  componentWillMount(){
    this.setState({
      max:this.props.maxLinkToShow,
    });
  }
  createLinks() {
      let links=[];
      let totalLinks= (this.props.nbreOfLinks >= this.state.max) ?
      this.state.max : this.props.nbreOfLinks;
      if(this.state.min > 1){
            if(this.state.min> 2){
              links.push(<a key="Min" href="#" className={this.props.styles.class}   onClick={this.handleLink.bind(this,"Min")}> {"||<"} </a>);
            }
          links.push(<a href="#" key="Back" className={this.props.styles.class}   onClick={this.handleLink.bind(this,"Back")}> {"<<<"} </a>);

      }
      for (let i = this.state.min; i <= totalLinks ; i++) {
        if((i-1)==this.props.currentLink){
          links.push(<a  key={i} href="#" className={`${this.props.styles.class} disabled`}   onClick={this.handleLink.bind(this,i)}>{i}</a>);        
        }else{
          links.push(<a  key={i} href="#" className={this.props.styles.class}   onClick={this.handleLink.bind(this,i)}>{i}</a>);        
        }
      }
      if(this.state.max < this.props.nbreOfLinks ){
            links.push(<a key="Next" href="#" className={this.props.styles.class}   onClick={this.handleLink.bind(this,"Next")}> {">>>"} </a>);
            if(this.state.max + 1 < this.props.nbreOfLinks){
              links.push(<a key="Max" href="#" className={this.props.styles.class}  onClick={this.handleLink.bind(this,"Max")}> {">||"} </a>);
            }
      }
      return links;
  }
  handleActivatedLink(whichLink){
    this.props.setActivatedLink(whichLink);
  }
  handleLink(whichLink,event){
    event.preventDefault();
    switch(whichLink){
      case "Next": this.setState({
                          max:this.state.max + 1,
                          min: this.state.min + 1,
                        });
                  break;
      case "Back": this.setState({
                          max: this.state.max -1,
                          min: this.state.min -1,
                        });
                  break;
      case "Max": this.setState({
                          min:(this.props.nbreOfLinks - this.state.max) + ( this.state.min) ,
                          max : this.props.nbreOfLinks,
                        });
                  break;
      case "Min":  this.setState({
                          max : (this.state.max -this.state.min) +1 ,
                          min:1
                        });
                  break;
      default: this.handleActivatedLink(whichLink-1);
    }

  }
  render() {
    return (
      <div id="links">
        {this.createLinks()}
      </div>
    );
  }
}

