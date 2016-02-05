Template.subZero.onCreated(function(){
  this.ready = new ReactiveVar();
  this.autorun( () =>{
    
    this.ready.set(false);

    var subs = FlowRouter.current().route.options.subs;
    var trackFun = FlowRouter.current().route.options.trackFun;
    var readyTracker = FlowRouter.current().route.options.readyTracker;

    //Trigger autorun on route change, in case both routes use subZero.
    FlowRouter.getRouteName(); 

    //Call Static Subscriptions:
    _.each( subs, sub => this.subscribe.apply(this, sub) );

    //`trackFun` && `readyTracker` gets their own autorun scope,
        //so they doesn't trigger the non reactive subscriptions above to be
        //rerun in the larger scope:
    if(trackFun){Tracker.autorun( () => trackFun.call(this) ); }
    if(readyTracker){
      Tracker.autorun(() =>{
        this.ready.set(false); 
        readyTracker.call(this);
      });
    }else{
      this.ready.set(true);
    }
  });
});

Template.subZero.helpers({ 
  loginNeeded: function(){
    var requireLogin = Template.instance().data.requireLogin; 
    return requireLogin && requireLogin() && !Meteor.user();
  },
  isReady: ()=> {
    return  Template.instance().ready.get() && 
            Template.instance().subscriptionsReady()
  }
});
