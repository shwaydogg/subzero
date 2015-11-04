Template.subZero.onCreated(function(){
  this.autorun( () =>{
    var subs = FlowRouter.current().route.options.subs;
    var trackFun = FlowRouter.current().route.options.trackFun;

    //Trigger autorun on route change, in case both routes use subZero.
    FlowRouter.getRouteName(); 

    //Call Static Subscriptions:
    _.each( subs, sub => this.subscribe.apply(this, sub) );

    //TrackFun gets it's own autorun scope, so it doesn't trigger the non reactive subscriptions to rerun:
    if(trackFun) Tracker.autorun( () => trackFun.call(this) ); 
  });
});
