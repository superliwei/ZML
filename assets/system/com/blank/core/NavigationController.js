NavigationController.prototype = new BasicCanvas();

function NavigationController()
{
	this.view = this.view.clone();
	this.view.css("overflow","hidden");
	this.defaultIdx = 0;
	this.manager = "DefaultNavigationManager";
	this.managerInstance = null;
}

NavigationController.prototype.constructComplete = function()
{
	this.init();
	BasicCanvas.prototype.constructComplete.call(this);
}

NavigationController.prototype.init = function()
{
	if(this.data.attr("defaultIdx")!=undefined)
	{
		this.defaultIdx = Number(this.data.attr("defaultIdx"));
	}
	if(this.data.attr("manager")!=undefined)
	{
		this.manager = this.data.attr("manager");
	}
	var ManagerClass = NavigationManagerMap[this.manager];
	if(ManagerClass!=undefined)
	{
		this.managerInstance = new ManagerClass(this);
	}
}