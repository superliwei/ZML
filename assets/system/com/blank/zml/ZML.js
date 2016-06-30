var ZML = {};

ZML.init = function(info)
{
	$(document).ready(function(){
		ZML.UserSelectControl.init();
		ZML.Application.container(info);
		ZML.Preloader.init();
		ZML.AssetsManager.init();
		ZML.Application.init();
	});
}

function trace(str)
{
	console.log(str);
}