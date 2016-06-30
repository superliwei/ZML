ZML.Transition.Reverse = function()
{
	this.ct0 = null;
	this.ct1 = null;
	this.container = null;
	this.view = null;
}

ZML.Transition.Reverse.prototype.start = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	var w = manager.controller.data.attr("width");
	var h = manager.controller.data.attr("height");

	var ct0 = $("<div>");
	ct0.css("position","absolute");
	$(fromElem).css("left",-w*0.5+"px");
	$(fromElem).css("top",-h*0.5+"px");
	$(fromElem).appendTo(ct0);

	var ct1 = $("<div>");
	ct1.css("position","absolute");
	$(toElem).css("left",-w*0.5+"px");
	$(toElem).css("top",-h*0.5+"px");
	$(toElem).appendTo(ct1);

	var container = $("<div>");
	container.css("position","absolute");
	container.css("left",w*0.5+"px");
	container.css("top",h*0.5+"px");
	container.appendTo(manager.controller.view);
	ct0.appendTo(container);

	var tz = -200;
	var time = 0.5;
	var dic = [];
	dic["left"] = {fx0:0,fx1:0,fy0:0,fy1:-90,tx0:0,tx1:0,ty0:90,ty1:0};
	dic["right"] = {fx0:0,fx1:0,fy0:0,fy1:90,tx0:0,tx1:0,ty0:-90,ty1:0};
	dic["up"] = {fx0:0,fx1:90,fy0:0,fy1:0,tx0:-90,tx1:0,ty0:0,ty1:0};
	dic["down"] = {fx0:0,fx1:-90,fy0:0,fy1:0,tx0:90,tx1:0,ty0:0,ty1:0};
	var fx0 = dic[manager.direction].fx0;
	var fx1 = dic[manager.direction].fx1;
	var fy0 = dic[manager.direction].fy0;
	var fy1 = dic[manager.direction].fy1;
	var tx0 = dic[manager.direction].tx0;
	var tx1 = dic[manager.direction].tx1;
	var ty0 = dic[manager.direction].ty0;
	var ty1 = dic[manager.direction].ty1;

	ct1.appendTo(container);
	TweenLite.to(ct1,0,{rotationX:tx0,rotationY:ty0,z:tz});

	TweenLite.set(container,{perspective:500});
	TweenLite.fromTo(ct0,time,{rotationX:fx0,rotationY:fy0,z:0},{rotationX:fx1,rotationY:fy1,z:tz,ease:Expo.easeIn,onComplete:function(){
		TweenLite.to(ct1,time,{rotationX:tx1,rotationY:ty1,z:0,ease:Expo.easeOut,onComplete:function(){
			self.dispose();
			onComplete();
		}});
	}});

	this.ct0 = ct0;
	this.ct1 = ct1;
	this.container = container;
	this.view = manager.controller.view;
}

ZML.Transition.Reverse.prototype.dispose = function()
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
	if(this.container)
	{
		this.container.remove();
		this.container = null;
	}
	this.view = null;
}

ZML.Transition.LeftReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "left";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.LeftReverse.prototype = new ZML.Transition.Reverse();

ZML.Transition.RightReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "right";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.RightReverse.prototype = new ZML.Transition.Reverse();

ZML.Transition.UpReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "up";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.UpReverse.prototype = new ZML.Transition.Reverse();

ZML.Transition.DownReverse = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "down";
	ZML.Transition.Reverse.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
ZML.Transition.DownReverse.prototype = new ZML.Transition.Reverse();

ZML.TransitionMap["leftReverse"] = ZML.Transition.LeftReverse;
ZML.TransitionMap["rightReverse"] = ZML.Transition.RightReverse;
ZML.TransitionMap["upReverse"] = ZML.Transition.UpReverse;
ZML.TransitionMap["downReverse"] = ZML.Transition.DownReverse;