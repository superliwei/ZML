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
		var container = $("<div>",{style:"position:absolute;"});
		container.width(this.view.innerWidth());
		container.height(this.view.innerHeight());
		container.prependTo(this.view);
		var chart = echarts.init(container.get(0));
		var jsStr = this.data.children("Option").text();
		var option = eval(jsStr);
		chart.setOption(option);
	}
	
	return ECharts;
})();
