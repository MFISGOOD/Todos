import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {UserSettings} from '../lib/collections/usersettings.js';

// Don't allow all client-side updates,inserts and deletes on the UserSettings collection
UserSettings.allow({
insert(){return false;},
update(){return false;},
remove(){return false;},
});

// Deny all client-side updates,inserts and deletes on the UserSettings collection
UserSettings.deny({
insert(){return true;},
update(){return true;},
remove(){return true;},
});
SettingSchema=new SimpleSchema({
    limit:{type:Number,optional:true},
});

const UserSettingsSchema=new SimpleSchema({
    _id:{type:String,optional:true},
    owner:{type:String,optional:true},
    createAt:{type:Date,optional:true },
    updateAt:{type:Date,optional:true},
    limit:{type:Number},
});

Meteor.methods({
    'add-settings'(usersettings){
        console.log(usersettings);
        check(usersettings,UserSettingsSchema);
        let eventualSettings=UserSettings.findOne({owner:this.userId});
        if(eventualSettings){
            throw new Meteor.Error("There are already settings that belong to you in the database.If you haven't before added any settings, please contact your administrator.");
        }
        if(this.userId && !eventualSettings){
            usersettings.owner=this.userId;
            usersettings.createAt= new Date();
            usersettings._id ? delete usersettings._id : null;
            return UserSettings.insert(usersettings);
        }else{
            throw new Meteor.Error("You don't have the rights to perform this action!");
        }  
    },
    'update-settings'(user,settings){
     check(user,String);
     check(settings,SettingSchema);
     if(this.userId && this.userId === user) {
       let eventualSettings=UserSettings.findOne({owner:user});
       if(eventualSettings){
        settings.updateAt=new Date();
        UserSettings.update(eventualSettings._id,{$set:settings}); 
        return eventualSettings._id;
       }else{
        throw new Meteor.Error(`you don't have any settings yet`);
      }

     }else{
         throw new Meteor.Error("You can't perform this action");
     }
    },
    'delete-settings'(owner){
        check(owner,String);
        if(this.userId && this.userId === owner) {
            let eventualSettings=UserSettings.findOne({owner:owner});
            if(eventualSettings){
                UserSettings.remove(eventualSettings._id);
              }else{
                  throw new Meteor.Error("you don't have any settings yet");
              }
        }else{
             throw new Meteor.Error("You can't perform this action");  
        }
    },
});

Meteor.publish('usersettings',function(){
    return UserSettings.find({owner:this.userId},{fields:{limit:1}});
})