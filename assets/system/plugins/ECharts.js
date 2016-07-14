ZML.FactoryMap["ECHARTS"] = (function(){
	
	ECharts.prototype = new ZML.BasicCanvas();
	
	function ECharts()
	{
		this.view = this.view.clone();
	}
	
	ECharts.prototype.constructComplete = function()
	{
		this.init();
		ZML.BasicCanvas.prototype.constructComplete.call(this);
	}
	
	ECharts.prototype.init = function()
	{
		var self = this;
		var container = $("<div>",{style:"position:absolute;"});
		container.prependTo(this.view);
		
		if(this.data.fixed == undefined || this.data.fixed == "true")//修正鼠标定位的问题
		{
			$(window).resize(resizeHandler);
			resizeHandler();
		}
		else
		{
			container.width(this.view.innerWidth());
			container.height(this.view.innerHeight());
		}
		
		
		var chart = echarts.init(container.get(0));
		var jsStr = this.data.children("Option").text();
		var option = eval(jsStr);
		if(option.isOptionObjReady != undefined)
		{
			option.onReady(function(_option){
				chart.setOption(_option);
			});
		}
		else
		{
			chart.setOption(option);
		}
		
		function resizeHandler(e)
		{
			var ts = ZML.Application.instance().container.contentLayer.css("zoom");
			ts = Number(ts);
			container.css("zoom",1/ts);
			container.width(self.view.innerWidth()*ts);
			container.height(self.view.innerHeight()*ts);
			if(chart != undefined)chart.resize();
		}
	}
	
	return ECharts;
})();