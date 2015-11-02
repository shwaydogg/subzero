if(Meteor.isClient){
Template.subZero.onCreated(function(){
  var self = this,
      subs = self.data.subs();
  self.template = self.data.template();
  _.each( subs, function(sub){
    self.subscribe.apply(self, sub);
  });
});
}
