Transition.Alpha = function(manager,fromElem,toElem,onComplete)
{
	var self = this;
	this.from = fromElem;
	this.to = toElem;
	$(toElem).prependTo(manager.controller.view);
	TweenLite.to(fromElem,0.5,{alpha:0});
	TweenLite.fromTo(toElem,0.5,{alpha:0},{alpha:1,onComplete:function(){
		self.dispose();
		onComplete();
	}});
}

Transition.Alpha.prototype.dispose = function()
{
	if(this.from)
	{
		$(this.from).detach();
		TweenLite.to(this.from,0,{alpha:1});
		TweenLite.killTweensOf(this.from);
		this.from = null;
	}
	if(this.to)
	{
		TweenLite.to(this.to,0,{alpha:1});
		TweenLite.killTweensOf(this.to);
		this.to = null;
	}
}

TransitionMap["alpha"] = Transition.Alpha;