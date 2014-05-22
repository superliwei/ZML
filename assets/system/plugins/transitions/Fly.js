Transition.Fly = function()
{
	this.ct0 = null;
	this.ct1 = null;
	this.view = null;
}
Transition.Fly.prototype.start = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	var w = manager.controller.data.attr("width");
	var h = manager.controller.data.attr("height");
	var ct0 = $("<div>");
	ct0.css("position","absolute");
	$(fromElem).css("left",-w*0.5+"px");
	$(fromElem).css("top",-h*0.5+"px");
	$(fromElem).appendTo(ct0);
	ct0.css("left",w*0.5+"px");
	ct0.css("top",h*0.5+"px");

	var ct1 = $("<div>");
	ct1.css("position","absolute");
	$(toElem).css("left",-w*0.5+"px");
	$(toElem).css("top",-h*0.5+"px");
	$(toElem).appendTo(ct1);
	ct1.css("left",w*0.5+"px");
	ct1.css("top",h*0.5+"px");

	ct0.appendTo(manager.controller.view);
	ct1[manager.direction=="in"?"appendTo":"prependTo"](manager.controller.view);

	var fts = manager.direction=="in"?0:3;
	var tts = manager.direction=="in"?3:0;

	TweenLite.fromTo(ct0,0.5,{scale:1,alpha:1},{scale:fts,alpha:0,ease:Expo.easeInOut});
	TweenLite.fromTo(ct1,0.5,{scale:tts,alpha:0},{scale:1,alpha:1,ease:Expo.easeInOut,onComplete:function(){
		self.dispose();
		onComplete();
	}});

	this.ct0 = ct0;
	this.ct1 = ct1;
	this.view = manager.controller.view;
}

Transition.Fly.prototype.dispose = function()
{
	if(this.ct0)
	{
		TweenLite.killTweensOf(this.ct0);
		var from = this.ct0.children().eq(0);
		from.css("left","0px");
		from.css("top","0px");
		from.appendTo(this.view);
		from.detach();
		this.ct0.remove();
		this.ct0 = null;
	}
	if(this.ct1)
	{
		TweenLite.killTweensOf(this.ct1);
		var to = this.ct1.children().eq(0);
		to.appendTo(this.view);
		to.css("left","0px");
		to.css("top","0px");
		this.ct1.remove();
		this.ct1 = null;
	}
	this.view = null;
}

Transition.FlyIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "in";
	Transition.Fly.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
Transition.FlyIn.prototype = new Transition.Fly();

Transition.FlyOut = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "out";
	Transition.Fly.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
Transition.FlyOut.prototype = new Transition.Fly();

TransitionMap["flyIn"] = Transition.FlyIn;
TransitionMap["flyOut"] = Transition.FlyOut;