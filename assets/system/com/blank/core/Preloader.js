function Preloader()
{

}

Preloader.loading = null;
Preloader.progress = 0;

Preloader.init = function()
{
	Preloader.loading = new Loading();
	Preloader.loading.view.appendTo(Application.container().view);
	Preloader.loading.view.css("left",(Application.container().width-Preloader.loading.width)*0.5+"px");
	Preloader.loading.view.css("top",(Application.container().height-Preloader.loading.height)*0.5+"px");
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