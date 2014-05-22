Transition.MoveIn = function(){}

Transition.MoveIn.prototype.start = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	this.from = fromElem;
	this.to = toElem;
	$(toElem).appendTo(manager.controller.view);
	var w = manager.controller.data.attr("width");
	var h = manager.controller.data.attr("height");
	var dc = [];
	dc["left"] = {from_x:0,from__x:w,from_y:0,from__y:0,to_x:-w,to__x:0,to_y:0,to__y:0};
	dc["right"] = {from_x:0,from__x:-w,from_y:0,from__y:0,to_x:w,to__x:0,to_y:0,to__y:0};
	dc["up"] = {from_x:0,from__x:0,from_y:0,from__y:h,to_x:0,to__x:0,to_y:-h,to__y:0};
	dc["down"] = {from_x:0,from__x:0,from_y:0,from__y:-h,to_x:0,to__x:0,to_y:h,to__y:0};
	var fx0 = dc[manager.direction].from_x;
	var fx1 = dc[manager.direction].from__x;
	var fy0 = dc[manager.direction].from_y;
	var fy1 = dc[manager.direction].from__y;
	var tx0 = dc[manager.direction].to_x;
	var tx1 = dc[manager.direction].to__x;
	var ty0 = dc[manager.direction].to_y;
	var ty1 = dc[manager.direction].to__y;
	TweenLite.fromTo(fromElem,0.5,{x:fx0,y:fy0},{x:fx1,y:fy1,ease:Expo.easeInOut});
	TweenLite.fromTo(toElem,0.5,{x:tx0,y:ty0},{x:tx1,y:ty1,ease:Expo.easeInOut,onComplete:function(){
		self.dispose();
		onComplete();
	}});
}
Transition.MoveIn.prototype.dispose = function()
{
	if(this.from)
	{
		$(this.from).detach();
		TweenLite.to(this.from,0,{x:0,y:0});
		TweenLite.killTweensOf(this.from);
		this.from = null;
	}
	if(this.to)
	{
		TweenLite.to(this.to,0,{x:0,y:0});
		TweenLite.killTweensOf(this.to);
		this.to = null;
	}
}

Transition.LeftMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "left";
	Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
Transition.LeftMoveIn.prototype = new Transition.MoveIn();

Transition.RightMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "right";
	Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
Transition.RightMoveIn.prototype = new Transition.MoveIn();

Transition.UpMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "up";
	Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
Transition.UpMoveIn.prototype = new Transition.MoveIn();

Transition.DownMoveIn = function(manager,fromElem,toElem,onComplete)
{
	manager.direction = "down";
	Transition.MoveIn.prototype.start.call(this,manager,fromElem,toElem,onComplete);
}
Transition.DownMoveIn.prototype = new Transition.MoveIn();

TransitionMap["leftMoveIn"] = Transition.LeftMoveIn;
TransitionMap["rightMoveIn"] = Transition.RightMoveIn;
TransitionMap["upMoveIn"] = Transition.UpMoveIn;
TransitionMap["downMoveIn"] = Transition.DownMoveIn;