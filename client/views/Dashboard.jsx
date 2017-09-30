import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class Dashboard extends Component{

onEdit(event){
  if(!$(event.target).hasClass('glyphicon-remove'))
  {
      $("#fieldEditContent_"+this.props.task._id).removeClass('display_');
      $("#fieldShowContent_"+this.props.task._id).addClass('display_');
      $(event.target).removeClass('glyphicon-edit').addClass('glyphicon-remove');
      $(`#${this.refs.removebtn.id}`).toggleClass('disabled');
      $(`#checked_${this.refs.id}`).toggleClass('disabled');
      $(`#${this.refs["checkContainer_"+this.props.task._id].id}`).toggleClass('disabled');

    }
    else
    {
      $("#fieldEditContent_"+this.props.task._id).addClass('display_');
      $("#fieldShowContent_"+this.props.task._id).removeClass('display_');
      $(event.target).removeClass('glyphicon-remove').addClass('glyphicon-edit');
      $(`#${this.refs.removebtn.id}`).toggleClass('disabled');
      $(`#${this.refs["checkContainer_"+this.props.task._id].id}`).toggleClass('disabled');
    }
  }

onDelete(event){
    if (window.confirm("Do you really want to delete this item?")) {
       this.props.deleteTask(this.props.task._id);
     }
  }
onUpdate(event){
    if(!$("#fieldEditContent_"+this.props.task._id).hasClass('display_')){
      this.props.updateTask(this.props.task._id,
        {content:this.refs['fieldEditContent_'+this.props.task._id].value});
      $("#fieldEditContent_"+this.props.task._id).addClass('display_');
      $("#fieldShowContent_"+this.props.task._id).removeClass('display_');
      $(`#${this.refs.editbtn.id} span`).removeClass('glyphicon-remove').addClass('glyphicon-edit');
      $(`#${this.refs.removebtn.id}`).toggleClass('disabled');
      $(`#${this.refs["checkContainer_"+this.props.task._id].id}`).toggleClass('disabled');
     }

   }

check(event){
   let id="#"+ event.target.id;
   $(id).toggleClass('glyphicon-unchecked');
   $(`#fieldShowContent_${this.props.task._id} span:first-child`).toggleClass('ruleout');
   $(`#${this.refs.savebtn.id}`).toggleClass('disabled');
   $(`#${this.refs.editbtn.id}`).toggleClass('disabled');
   $(`#${this.refs.removebtn.id}`).toggleClass('disabled');
   let checked=$( id ).hasClass( "glyphicon-unchecked");
   this.props.updateTask(this.props.task._id,
   {checked:!checked});
  }
render(){
    return(
          <div className="input-group">
            <span className="input-group-addon input-group-addon2">
                 <span ref="" id="">
                   <span className="glyphicon glyphicon-check" id="" ref="" onClick={this.check.bind(this)}></span>
                 </span>
            </span>{/* check hide completed tasks*/}
            <span id="" className="taskContent">
              <span className="fieldShowContent" id="">
                 <span style={{border:'none',boxShadow: 'none',overflow:'auto'}} type="text" className="fieldShowContent form-control_" ref="">
                 </span>
              </span>
            </span>{/*field content  */}

            <span className="input-group-addon input-group-addon2">
                  <a href="#" ref="savebtn" id="" >
                    <span className="glyphicon glyphicon-save" onClick={this.onUpdate.bind(this)}>
                    </span>{/*save icon  */}
                 </a>
            </span>
            <span className="input-group-addon input-group-addon2">

                 <a href="#" ref="editbtn" id="">
                   <span className="glyphicon glyphicon-edit" onClick={this.onEdit.bind(this)} >
                   </span>{/*edit icon  */}
                </a>
            </span>
            <span className="input-group-addon input-group-addon2">
              <a href="#" ref="removebtn" id="">
                <span className="glyphicon glyphicon-trash" onClick={this.onDelete.bind(this)}>
                </span>{/*trash icon  */}
              </a>
            </span>
         </div>
    );
  }
}
