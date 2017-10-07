import React ,{Component} from 'react'
import Pagination from './Pagination.jsx'

export class AppFooter extends Component{
    constructor(props){
      super(props);
      
    }
    handleGetPage(pageNumber){
      this.props.getPage(pageNumber -1);
    }
  
    render(){
      let nbrePages= parseInt(this.props.nbreOfRecords/this.props.limit);
      nbrePages+= (this.props.nbreOfRecords%this.props.limit == 0) ? 0 : 1;
      return(
        <div className="container bg-primary">
          <div className="row" style={{color:"#fff"}}>
            <Pagination 
              styles={{class:"pagination"}}
              nbreOfLinks={nbrePages}
              maxLinkToShow={5}
              currentLink={this.props.currentPage}
              setActivatedLink={this.props.getPage}
              />
          </div>
          <div className="row footer">
             <span className="glyphicon glyphicon-envelope"></span> <a href="mailto:ryson@outlook.be">ryson@outlook.be</a>
             <span className="pull-right"><span className="belgium-flag"></span><span className="belgium-flag"></span><span className="belgium-flag"></span>Brussels</span>
          </div>
         </div>
      );
    }
  }