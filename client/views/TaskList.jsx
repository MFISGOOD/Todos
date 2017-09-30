import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import Task from './Task.jsx';

export default class TaskList extends Component{

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
