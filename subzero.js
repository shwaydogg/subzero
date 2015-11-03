Template.subZero.onCreated(function(){
  var self = this;
  var subs = FlowRouter.current().route.options.subs;
  var trackFun = FlowRouter.current().route.options.trackFun;

  if(trackFun) self.autorun(function(){
    trackFun.call(self);
  });

  _.each( subs, function(sub){
    self.subscribe.apply(self, sub);
  });
});

Template.subZero.onRendered(function(){
  console.log('RENDERED SUBZERO TEMP, this:', this);
});

Template.subZero.onDestroyed(function(){
  console.log("SUBZERO CONTROLLER TEMPLATE DESTROYED, this:", this);
  //if(this.comp) this.comp.stop();
  //else console.warn('no this.comp');
});
