ZML.BasicNavigationManager = (function(){
	
	BasicNavigationManager.prototype = new ZML.NavigationManagerBase();

	function BasicNavigationManager(_navigationController)
	{
		this.ct = null;
		this.init(_navigationController);
	}
	
	BasicNavigationManager.prototype.init = function(_navigationController)
	{
		ZML.NavigationManagerBase.prototype.init.call(this,_navigationController);
		var len = this.children.length;
		this.ct = $("<div>");
		this.ct.appendTo(this.controller.view);
		this.ct.css("position","absolute");
		
		this.ct.width(len*100+"%");
		this.ct.height("100%");
		this.ct.css("display","flex");
		
		for(var i=0;i<len;i++)
		{
			var childBox = $("<div>");
			childBox.css("flex-grow",1);
			childBox.appendTo(this.ct);
			var child = $(this.children[i]);
			child.appendTo(childBox);
		}
	}
	
	BasicNavigationManager.prototype.pre = function()
	{
		var idx = this.controller.defaultIdx;
		idx--;
		if(idx>-1)
		{
			this.showIdx(idx);
		}
	}
	
	BasicNavigationManager.prototype.next = function()
	{
		var idx = this.controller.defaultIdx;
		idx++;
		var len = this.children.length;
		if(idx<len)
		{
			this.showIdx(idx);
		}
	}
	
	BasicNavigationManager.prototype.showIdx = function(_idx)
	{
		var tl = -_idx*100+"%";
		try
		{
			TweenLite.to(this.ct,0.5,{left:tl,ease:Expo.easeInOut});
		}catch(e)
		{
			//trace(e.message);
			this.ct.animate({left:tl},500);
		}
		this.controller.defaultIdx = _idx;
	}
	
	return BasicNavigationManager;
	
})();