// Server
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import { Session } from 'meteor/session';

import {Tasks} from '../lib/collections/tasks.js'
import {TotalRecords} from '../lib/collections/tasks.js'
// import { Accounts } from 'meteor/accounts-base';
// import { check } from 'meteor/check';
// var blind = require('password-hash');

// By default, the current user’s username, emails and profile are published to the client. You can publish additional fields for the current user with:
Meteor.onConnection((connection) => {
  // console.log(connection.httpHeaders);
  // console.log(Meteor.absoluteUrl());
});

// Deny all client-side updates,inserts and deletes on the Lists collection
Tasks.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; },
});
Tasks.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; },
});

const TaskSchema=new SimpleSchema({
  _id:{type:String, optional:true},
  content:{type: String},
  checked:{type: Boolean},  //notes for the player for coach
  createdAt:{type: Date, optional:true},
  updateAt:{type: Date, optional:true},
  owner:{type: String,optional:true},
});

Meteor.publish('tasks',function(query,projection){
  query = query || {};
  projection = projection || {};
  let limit = projection.limit || 1000;
  let skip = projection.skip || 0;
  let fields = projection.fields || {content: 1,checked:1};
  return Tasks.find({owner:this.userId},{
    limit:limit,
    skip:skip,
    fields:fields,
    sort:{createdAt:-1}
  });
});
Meteor.publish('totalRecords',function(){
  return Tasks.find({owner:this.userId});
});

Meteor.methods({
  'add-task'(task){
    //validate the task schema
    check(task,TaskSchema);
    if(this.userId){
      task.createdAt=new Date();
      task.owner=this.userId;
      let id=Tasks.insert(task);
      return id;
    }else{
      throw new Meteor.Error("You don't have the rights to perform this action!");
    }

  },
  'update-task'(_id,fields){
    check(_id,String);
    check(fields,Object);
    let eventualFields1={content:{type: String, optional:true},checked:{type: Boolean}};
    let eventualFields2={content:{type: String},checked:{type: Boolean, optional:true}};
    try{
      new SimpleSchema(eventualFields1).validate(fields);
    }catch(e){
      new SimpleSchema(eventualFields2).validate(fields);
    }
    //validate fields
    if(this.userId){
      let eventualtask=Tasks.findOne({_id:_id,owner:this.userId});
      if(eventualtask){
        fields.updateAt = new Date();
        Tasks.update(_id,{$set:fields});
        return _id;
      }else{
          throw new Meteor.Error(`you don't have any task with the _id=${_id} `);
      }
    }else{
      throw new Meteor.Error("You don't have the rights to perform this action!");
    }
  },
  'delete-task'(_id){
    check(_id,String);
    if(this.userId){
      let eventualtask=Tasks.findOne({_id:_id,owner:this.userId});
      if(eventualtask){
        Tasks.remove(_id);
      }else{
          throw new Meteor.Error(`you don't have any task with the _id=${_id} `);
      }
    }else{
      throw new Meteor.Error("You don't have the rights to perform this action!");
    }
  },
  'getTotalTasks'(){
    if(this.userId){
      return Tasks.find({owner:this.userId}).count();
    }else{
      return 0;
    }
  },


});
Meteor.startup(function(){
  // Tasks.remove({owner:"P4ex3hRxWuvFgPDj2"});
  // for (var i = 0; i < 100; i++) {
  //   if(i%2 == 0)
  //   Tasks.insert({owner:"P4ex3hRxWuvFgPDj2",content:`new task ${i}`,checked:false});
  //   else {
  //     Tasks.insert({owner:"P4ex3hRxWuvFgPDj2",content:`new task ${i}`,checked:true});
  //   }
  // }
});
