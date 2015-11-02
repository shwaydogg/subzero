Template.subZero.onCreated(function(){
  var self = this;
  var subs = FlowRouter.current().route.options.subs;

  _.each( subs, function(sub){
    if(_.isFunction(sub)){
      sub.call(self, 'teamMarks');
    }else{
      self.subscribe.apply(self, sub);
    }
  });
});
