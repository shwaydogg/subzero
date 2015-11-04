Template.subZero.onCreated(function(){
  var self = this;
  self.theTemplate = new ReactiveVar(self.data.template());

  self.autorun( () => {
    var subs = FlowRouter.current().route.options.subs;
    self.theTemplate.get(); 
    _.each( subs, sub => self.subscribe.apply(self, sub) );
  });

  self.autorun( () => {
    var trackFun = FlowRouter.current().route.options.trackFun;
    self.theTemplate.get(); 
    if(trackFun) trackFun.call(self);
  });

});

Template.subZero.helpers({
  theTemplate : function(){
    //console.log('this:', this, '  instance:',  Template.instance());
    var instance = Template.instance(), 
        theTemplate = this.template();

    instance.theTemplate.set(theTemplate);
    return Template[theTemplate];
  }
});

Template.subZero.onRendered(function(){
  console.log('RENDERED SUBZERO TEMP, this:', this);
});

Template.subZero.onDestroyed(function(){
  console.log("SUBZERO CONTROLLER TEMPLATE DESTROYED, this:", this);
  //if(this.comp) this.comp.stop();
  //else console.warn('no this.comp');
});
