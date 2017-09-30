import React, {Component} from 'react';
import {PropTypes} from 'prop-types';

export default class Task extends Component{

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
        <li className="list-group-item item">
          <div className="input-group">
            <span className="input-group-addon input-group-addon2">
             {/* <input type="checkbox" ref="checked" defaultchecked={this.state.checked} /> */}
             {
               this.props.task.checked ?
                 <span ref={"checkContainer_"+this.props.task._id} id={"checkContainer_"+this.props.task._id}>
                   <span className="glyphicon glyphicon-check" id={"checked_"+this.props.task._id} ref={"checked_"+this.props.task._id} onClick={this.check.bind(this)}></span>
                 </span>
               :
                 <span ref={"checkContainer_"+this.props.task._id} id={"checkContainer_"+this.props.task._id}>
                   <span className="glyphicon glyphicon-check glyphicon-unchecked" id={"checked_"+this.props.task._id} ref={"checked_"+this.props.task._id} onClick={this.check.bind(this)}></span>
                  </span>
             }{/*check/uncheck icon  */}
            </span>
            <span id={"fieldContent_"+this.props.task._id} className="taskContent">
              <span className="display_" id={"fieldEditContent_"+this.props.task._id}>
                <input style={{}} type="text" className="form-control_"  defaultValue={this.props.task.content} ref={"fieldEditContent_"+this.props.task._id}
                id={"fieldEditContent_"+this.props.task._id}/>
              </span>
              <span className="" id={"fieldShowContent_"+this.props.task._id}>
               {
                 this.props.task.checked ?
                 <input style={{border:'none',boxShadow: 'none'}} type="text" className="form-control_  ruleout textOverflow"   ref={"fieldShowContent_"+this.props.task._id} value={this.props.task.content}
                  readOnly
                 />
                 :
                 <input style={{border:'none',boxShadow: 'none'}} type="text" className="form-control_ textOverflow"   ref={"fieldShowContent_"+this.props.task._id} value={this.props.task.content}
                 readOnly
                 />

               }

              </span>
            </span>{/*field content  */}

            <span className="input-group-addon input-group-addon2">
               {
                 this.props.task.checked ?
                   <a href="#" ref="savebtn" id={`savebtn_${this.props.task._id}`} className="disabled">
                     <span className="glyphicon glyphicon-save" onClick={this.onUpdate.bind(this)} style={{color:'green'}}>
                     </span>{/*save icon  */}
                  </a>
                  :
                  <a href="#" ref="savebtn" id={`savebtn_${this.props.task._id}`} >
                    <span className="glyphicon glyphicon-save" onClick={this.onUpdate.bind(this)} style={{color:'green'}}>
                    </span>{/*save icon  */}
                 </a>
                }
            </span>
            <span className="input-group-addon input-group-addon2">
               {
               this.props.task.checked ?
                 <a href="#" ref="editbtn" id={`editbtn_${this.props.task._id}`} className="disabled">
                   <span className="glyphicon glyphicon-edit" onClick={this.onEdit.bind(this)} >
                   </span>{/*edit icon  */}
                </a>
               :
                 <a href="#" ref="editbtn" id={`editbtn_${this.props.task._id}`}>
                   <span className="glyphicon glyphicon-edit" onClick={this.onEdit.bind(this)} >
                   </span>{/*edit icon  */}
                </a>
             }
            </span>
            <span className="input-group-addon input-group-addon2">
            {
              this.props.task.checked ?
                <a href="#" ref="removebtn" id={`removebtn_${this.props.task._id}`} className="disabled">
                  <span className="glyphicon glyphicon-trash" onClick={this.onDelete.bind(this)}  style={{color:'black'}}>
                  </span>{/*trash icon  */}
                </a>
              :
              <a href="#" ref="removebtn" id={`removebtn_${this.props.task._id}`}>
                <span className="glyphicon glyphicon-trash" onClick={this.onDelete.bind(this)} style={{color:'black'}}>
                </span>{/*trash icon  */}
              </a>
            }
            </span>
         </div>

      </li>
    );
  }
}

Task.proptypes={
  task: PropTypes.object.isRequired,
}
