ZML.Preloader = (function(){
	
	function Preloader()
	{
	
	}
	
	Preloader.loading = null;
	Preloader.progress = 0;
	
	Preloader.init = function()
	{
		Preloader.loading = new ZML.Loading();
		Preloader.loading.view.appendTo(ZML.Application.container().view);
		Preloader.loading.view.css("left",(ZML.Application.container().width-Preloader.loading.width)*0.5+"px");
		Preloader.loading.view.css("top",(ZML.Application.container().height-Preloader.loading.height)*0.5+"px");
	}
	
	Preloader.appendProgress = function(value)
	{
		Preloader.progress+=value;
		Preloader.loading.progress(Preloader.progress);
	}
	
	Preloader.complete = function()
	{
		Preloader.loading.view.remove();
	}
	
	return Preloader;
	
})();
