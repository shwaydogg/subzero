Template.subZero.onCreated(function(){
  this.ready = new ReactiveVar();
  this.autorun( () =>{
    var subs = FlowRouter.current().route.options.subs;
    var trackFun = FlowRouter.current().route.options.trackFun;
    var readyTracker = FlowRouter.current().route.options.readyTracker;

    //Trigger autorun on route change, in case both routes use subZero.
    FlowRouter.getRouteName(); 

    //Call Static Subscriptions:
    _.each( subs, sub => this.subscribe.apply(this, sub) );

    //TrackFun gets it's own autorun scope, so it doesn't trigger the non reactive subscriptions to rerun:
    if(trackFun)Tracker.autorun( () => trackFun.call(this) ); 
    if(readyTracker){
      Tracker.autorun( () => readyTracker.call(this) );
    }else{
      this.ready.set(true);
    }
  });
});

Template.subZero.helpers({ 
  isReady: ()=> {
    return  Template.instance().ready.get() && 
            Template.instance().subscriptionsReady()
  }
});
