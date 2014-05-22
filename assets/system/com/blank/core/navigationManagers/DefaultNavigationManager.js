DefaultNavigationManager.prototype = new NavigationManagerBase();

function DefaultNavigationManager(_navigationController)
{
	this.init(_navigationController);
}

DefaultNavigationManager.prototype.init = function(_navigationController)
{
	NavigationManagerBase.prototype.init.call(this,_navigationController);
	var len = this.children.length;
	for(var i=0;i<len;i++)
	{
		var child = this.children[i];
		$(child).detach();
	}
	$(this.children[this.controller.defaultIdx]).prependTo(this.controller.view);
}

DefaultNavigationManager.prototype.showIdx = function(_idx)
{
	if(this.controller.defaultIdx == _idx)return;
	var self = this;
	var lastIdx = this.controller.defaultIdx;
	var effectName = $(this.eventData).attr("effect");
	if(effectName==undefined)
	{
		effectName = "none";
	}
	var TransitionClass = TransitionMap[effectName];
	if(TransitionClass == undefined)
	{
		effectName = "none";
		TransitionClass = TransitionMap[effectName];
	}
	if(this.transtionInstance!=null)
	{
		this.transtionInstance.dispose();
		this.transtionInstance = null;
	}
	this.transtionInstance = new TransitionClass(this,this.children[lastIdx],this.children[_idx],function(){
		BroadcastCenter.sendEvent($(self.eventData).children("onComplete").prop("outerHTML"));
	});
	this.controller.defaultIdx = _idx;
}