var AssetsManager = {};
AssetsManager.appData = null;
AssetsManager.configData = null;
AssetsManager.loadList = [];
AssetsManager.init = function()
{
	//加载配置文件
	function loadConfig(onComplete)
	{
		var configUrl = CoreURL.system+CoreURL.systemConfig;
		$.get(configUrl,function(data){
			AssetsManager.configData = data;
			Preloader.appendProgress(5);
			onComplete();
		},"text");
	}

	//加载JS和CSS
	function loadJS_and_CSS(onComplete)
	{
		var list = $(AssetsManager.configData).last().children("import").eq(0).children();
		var len = list.length;
		if(len>0)
		{
			loadIdx(0);
		}
		else
		{
			Preloader.appendProgress(40);
			onComplete();
		}

		function loadIdx(_idx)
		{
			if(_idx == len)
			{
				onComplete();
				return;
			}
			var nodeName = $(list[_idx]).prop("nodeName").toUpperCase();
			if(nodeName == "SCRIPT")
			{
				loadJS(_idx,completeHandler);
			}
			else if(nodeName == "LINK")
			{
				loadCSS(_idx,completeHandler);
			}
		}

		function loadJS(_idx,_onComplete)
		{
			var jsUrl = $(list[_idx]).attr("src");
			$.getScript(jsUrl,function(){
				_onComplete(_idx);
			});
		}

		function loadCSS(_idx,_onComplete)
		{
			var cssUrl = $(list[_idx]).attr("href");
			$.get(cssUrl,function(data){
				$(list[_idx]).appendTo("head");
				_onComplete(_idx);
			});
		}

		function completeHandler(_idx)
		{
			Preloader.appendProgress(40/len);
			_idx++;
			loadIdx(_idx);
		}
	}

	//加载Application.xml
	function loadAppData(onComplete)
	{
		var appUrl = CoreURL.app+CoreURL.appRoot;
		$.get(appUrl,function(data){
			AssetsManager.appData = data;
			BroadcastCenter.dispatchEvent(new Event(CoreEvent.APP_DATA_READY));
			Preloader.appendProgress(5);
			onComplete();
		},"text");
	}

	loadConfig(function(){
		loadJS_and_CSS(function(){
			loadAppData(function(){});
		});
	});
}

AssetsManager.appendToLoad = function(url,onComplete)
{
	AssetsManager.loadList.push({url:url,onComplete:onComplete});
}

//预加载应用程序资源
AssetsManager.assetsLoadStart = function()
{
	Preloader.appendProgress(5);
	var len = AssetsManager.loadList.length;
	if(len>0)
	{
		loadAsset(0);
	}
	else
	{
		Preloader.appendProgress(45);
		allComplete();
	}
	function loadAsset(_idx)
	{
		if(_idx == len)
		{
			allComplete();
			return;
		}
		var url = AssetsManager.loadList[_idx].url;
		var func = AssetsManager.loadList[_idx].onComplete;
		if(isImageUrl(url))
		{
			loadImage(url,function(img){
				func(img);
				loadComplete(_idx);
			});
		}
		else
		{
			$.get(url,function(data){
				func(data);
				loadComplete(_idx);
			});
		}
	}

	function loadImage(_url,_onComplete)
	{
		var img = new Image();
		img.onload = function()
		{
			_onComplete(img)
		}
		img.src = _url;
	}

	function isImageUrl(_url)
	{
		var result = false;
		var exts = ["jpg","jpeg","png","gif"];
		var i = exts.length;
		while(i--)
		{
			var tmp = _url.indexOf(exts[i]);
			if(tmp>-1)
			{
				result = true;
				break;
			}
		}
		return result;
	}

	function loadComplete(_idx)
	{
		Preloader.appendProgress(45/len);
		_idx++;
		loadAsset(_idx);
	}

	function allComplete()
	{
		Preloader.complete();
		BroadcastCenter.dispatchEvent(new Event(CoreEvent.ASSETS_READY));
	}
}