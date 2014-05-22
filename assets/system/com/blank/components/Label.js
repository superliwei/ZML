Label.prototype = new BasicCanvas();

function Label()
{
	this.view = this.view.clone();
}

Label.prototype.construct = function(_data)
{
	BasicCanvas.list.push(this);
	this.data = _data;
	BasicCanvas.prototype.mappingCss.call(this,_data);
	this.initEvents();
	this.text(this.data.attr("text"));
	BasicCanvas.prototype.constructComplete.call(this);
}

Label.prototype.initEvents = function()
{
	BasicCanvas.prototype.initEvents.call(this);
	var self = this;
	BroadcastCenter.addEventListener(CanvasEvent.prototype.type,function(event,data){
		if($(data).attr("id") == undefined || $(data).attr("id")!=self.data.attr("id"))return;
		var action = $(data).attr("action");
		if(action!=undefined && action == "set")
		{
			if($(data).attr("text")!=undefined)
			{
				self.text($(data).attr("text"));
			}
		}
	});
}

Label.prototype.text = function(str)
{
	if(str==undefined)return;
	str = str.replace(/ /g,"&nbsp;");
	this.view.html(str);
}