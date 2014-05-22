var CoreSystem = {};
CoreSystem.start = function(info)
{
	$(document).ready(function(){
		UserSelectControl.init();
		Application.container(info);
		Preloader.init();
		AssetsManager.init();
		Application.init();
	});
}


function trace(str)
{
	console.log(str);
}