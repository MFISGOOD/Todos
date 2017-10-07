import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Task from './Task.jsx';

export default class TasksList extends Component{
handleSettings(){

}
componentDidMount(){
  
}
handleLimit(event){
  //check the coherence of the user input
  this.props.changeLimit(this.refs.inputlimit.value);
  this.refs.inputlimit.value='';
}
handleAddNewTask(event){
  event.preventDefault();
  const content=this.refs.taskContent.value;
  const checked=false;
  if(!content){
    alert('the field add-new-task must not be empty!');
  }else{
    try{
      this.props.addTask({content:content,checked:checked});
      this.refs.taskContent.value="";
    }catch(e){
      alert(e.reason)
    }
  }
}
handleHideComletedTasks(event){
  this.props.showCompletedTask(event.target.checked);
}
// handleInputChange(event){

// }
render(){
   
    return(
      <div className="taskList-container">
         <form className="input-group item" onSubmit={this.handleAddNewTask.bind(this)}>
            <span className="input-group-addon cog"  style={{position:'relative'}} id="basic-addon1" type="submit" onClick={this.handleSettings.bind(this)}>
                <span className="glyphicon glyphicon-cog" >
                </span>
                <div className="dropdownContent panel panel-info settings-container"  >
                  <div className="panel-heading" >
                      <div className="panel-title" style={{fontSize:18}}>Preferences 
                      </div>
                  </div>
                  <div  className="panel-body panel-body-margin" >
                    <div className="form-group">
                        <div className="row">
                        <label htmlFor="limit" className="labelInput col-md-3 col-sm-4 col-xs-6">Number of Lines:  </label>
                          <div className={this.props.nbreOfRecords ? "input-group col-md-9 col-sm-8 col-xs-6" : "input-group disabled col-sm-8 col-md-9 col-xs-6"}>
                            <input type="number" className={this.props.nbreOfRecords ? "form-control_ limit" : "form-control_ disabled limit " }

                              name="limit" placeholder={this.props.settings? `Actual value is ${this.props.settings.limit}`:"Number of lines to show.."}
                              //onChange={this.handleLimit.bind(this)}                   
                              min={this.props.nbreOfRecords > 0 ? 1 : 0 } 
                              max={this.props.nbreOfRecords > 0 ? this.props.nbreOfRecords  : 0}        
                              ref="inputlimit"
                              // onChange={this.handleInputChange.bind(this)} 
                              />
                              <span className="input-group-addon input-group-addon2 saveLimit">
                                  <a href="#" ref="savelimit" id="" className="">
                                  <span className="glyphicon glyphicon-save" onClick={this.handleLimit.bind(this)} style={{color:'green'}}>
                                  </span>{/*save icon  */}
                                  </a>
                             </span>
                          </div>
                        </div>
                        <div className="row" style={{margin:10}}>
                        <div className={this.props.nbreOfRecords ? "input-group" : "input-group disabled"}>
                            <label className="checkbox-inline">
                            <input type="checkbox" value="" onChange={this.handleHideComletedTasks.bind(this)}/> Hide Completed Tasks
                            </label>
                          </div>
                        </div>
                     </div>
                  </div>   
                </div>
            </span>
            <textarea type="text" className="form-control addNewItem" placeholder="Add a new task"  ref="taskContent"/>
            <span className="input-group-addon btn btn-primary " id="basic-addon2" type="submit" onClick={this.handleAddNewTask.bind(this)}>Add</span>
         </form>
         <ul className="list-group">
              {
                this.props.tasks.map((task)=>{
                  if(this.props.filter && this.props.filter !="" && task.content.indexOf(this.props.filter)!= -1){
                   if(this.props.isCompleted && !task.checked){
                     return <Task key={task._id} task={task}    deleteTask={this.props.deleteTask}
                     updateTask={this.props.updateTask}
                   /> //filtered-completed data
                 }else if(!this.props.isCompleted){
                   return <Task key={task._id} task={task}    deleteTask={this.props.deleteTask}
                   updateTask={this.props.updateTask}
                 /> //filtered-data
                 }
                }else if(!this.props.filter || this.props.filter ===""){
                    if(this.props.isCompleted && !task.checked){
                      return <Task key={task._id} task={task}    deleteTask={this.props.deleteTask}
                      updateTask={this.props.updateTask}
                     /> //no-filtered-completed data
                    }else if(!this.props.isCompleted){
                      return <Task key={task._id} task={task}    deleteTask={this.props.deleteTask}
                      updateTask={this.props.updateTask}
                     /> //no-filtered data
                    }
                  }
                })
              }
         </ul>
      </div>
    );
  }
}

TasksList.proptypes={
  tasks: PropTypes.array.isRequired,
}
