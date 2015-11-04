A controller template for managing subscriptions and a waiting template.  [More than subscriptions to come?]
Currently only for use with FlowRouter and Blaze.

---

Did this already exist? I wasn't able to find it, but please let me know!

## Example Use:

Blaze Setup:

```
<template name="layout">
  {{> Template.dynamic template=top}}
  {{> Template.dynamic template=main}}
</template>
<template name="waitingContent">
  I could be a spinner!
</template>
<template name="finalContent">
  Final content created and rendered when subscriptions are ready.
</template>
```

Route Example::
```
FlowRouter.route('/myRoute/:paramId', {
  name: 'myRouteName',
  trackFun: function(){
    console.warn('Reactive Subscription Function Run');
    var myId = Session.get('myId');

    //this is the template instance.  Subscriptions should be called on this so that the subscription will be properly removed on template destruction.
    this.subscribe('mySubscription', myId);
  },
  action: function(params){
    BlazeLayout.render('layout', {
      main: "subZero", 
      template: "finalContent", 
      waitingTemplate: "waitingContent"
    });
  }
});
```


## TODO:
* Add ensureSignedInSupport
* Allow for session or reactive var support so the template can set a ready or not-ready state to also wait on.
* Integrate with Arunoda or Chet Corcos's Sub Caching

---

Will probably change the name, but got to it by way of:
Subscription Template -> subTemp -> subZero 

Better name `flowControl`?
