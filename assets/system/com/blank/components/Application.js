Application.prototype = new BasicCanvas();

Application._instance = null;

function Application ()
{
	this.view = this.view.clone();
}

Application.instance = function()
{
	if(Application._instance == null)
	{
		Application._instance = new Application();
	}
	return Application._instance;
}

Application.init = function()
{
	BroadcastCenter.addEventListener(CoreEvent.APP_DATA_READY,function(){
		Application.instance().view.one(BasicCanvas.CONSTRUCT_COMPLETE,function(){
			AssetsManager.assetsLoadStart();
		});
		Application.instance().construct($(AssetsManager.appData).last());
	});
	BroadcastCenter.addEventListener(CoreEvent.ASSETS_READY,function(){
		Application.instance().view.appendTo(Application.container().view);
	});
}

Application._container_info = null;
Application.container = function(info)
{
	if(info!=undefined)
	{
		info.view = $("<div>");
		info.view.css("width",info.width+"px");
		info.view.css("height",info.height+"px");
		if(info.background!=undefined)
		{
			info.view.css("background",info.background);
		}
		else
		{
			info.view.css("background","#000000");
		}
		info.view.appendTo("body");
		Application._container_info = info;
	}
	else
	{
		return Application._container_info;
	}
}