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
