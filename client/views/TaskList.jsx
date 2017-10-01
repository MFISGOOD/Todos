import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Task from './Task.jsx';

export default class TaskList extends Component{
handleSettings(){

}
handleLimit(event){
  //check the coherence of the user input
  this.props.changeLimit(event.target.value);
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
render(){
    return(
      <div className="taskList-container">
         <form className="input-group item" onSubmit={this.handleAddNewTask.bind(this)}>
            <span className="input-group-addon cog"  style={{position:'relative'}} id="basic-addon1" type="submit" onClick={this.handleSettings.bind(this)}>
                <span className="glyphicon glyphicon-cog " >
                </span>
                <div className="dropdownContent panel panel-info" >
                  <div className="panel-heading" >
                      <div className="panel-title">Application settings 
                      </div>
                  </div>
                  <div  className="panel-body panel-body-margin" >
                    <div className="form-group">
                        <label htmlFor="limit" className="">Tape the Desired number of lines.</label>
                        <div className="row">
                          <div className={this.props.nbreOfRecords ? "input-group" : "input-group disabled"}>
                            <input type="number" className={this.props.nbreOfRecords ? "form-control_ limit" : "form-control_ disabled limit " }

                              name="limit" placeholder="Numbre of lines..." 
                              onChange={this.handleLimit.bind(this)}                   defaultChecked={10} 
                              min={this.props.nbreOfRecords > 0 ? 1 : 0 } 
                              max={this.props.nbreOfRecords > 0 ? this.props.nbreOfRecords  : 0}        
                              />
                              <span className="input-group-addon input-group-addon2 saveLimit">
                                  <a href="#" ref="savelimit" id="" className="">
                                  <span className="glyphicon glyphicon-save" onClick={this.handleLimit.bind(this)} style={{color:'green'}}>
                                  </span>{/*save icon  */}
                                  </a>
                             </span>
                          </div>
                        </div>
                     </div>
                  </div>   
                </div>
            </span>
            <input type="text" className="form-control addNewItem" placeholder="Add a new task"  ref="taskContent"/>
            <span className="input-group-addon btn btn-primary " id="basic-addon2" type="submit" onClick={this.handleAddNewTask.bind(this)}>Add</span>
         </form>
         <ul className="list-group">
              {
                this.props.tasks.map((task)=>{
                  if(this.props.filter && this.props.filter !="" && task.content.indexOf(this.props.filter)!= -1){
                   if(this.props.isCompleted && task.checked){
                     return <Task key={task._id} task={task}    deleteTask={this.props.deleteTask}
                     updateTask={this.props.updateTask}
                   /> //filtered-completed data
                 }else if(!this.props.isCompleted){
                   return <Task key={task._id} task={task}    deleteTask={this.props.deleteTask}
                   updateTask={this.props.updateTask}
                 /> //filtered-data
                 }
                }else if(!this.props.filter || this.props.filter ===""){
                    if(this.props.isCompleted && task.checked){
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

TaskList.proptypes={
  tasks: PropTypes.array.isRequired,
}
