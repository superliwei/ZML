HtmlCanvas.prototype = new BasicCanvas();

function HtmlCanvas()
{
	this.view = this.view.clone();
}

HtmlCanvas.prototype.construct = function(_data)
{
	BasicCanvas.list.push(this);
	this.data = _data;
	BasicCanvas.prototype.mappingCss.call(this,_data);
	this.initEvents();
	this.view.html(this.data.html());
	BasicCanvas.prototype.constructComplete.call(this);
}

HtmlCanvas.prototype.initEvents = function()
{
	BasicCanvas.prototype.initEvents.call(this);
	var self = this;
	BroadcastCenter.addEventListener(CanvasEvent.prototype.type,function(event,data){
		if($(data).attr("id") == undefined || $(data).attr("id")!=self.data.attr("id"))return;
		var action = $(data).attr("action");
		if(action!=undefined && action == "set")
		{
			var html = $(data).attr("html");
			if(html != undefined)
			{
				self.view.html($(data).children(html).html());
			}
		}
	});
}