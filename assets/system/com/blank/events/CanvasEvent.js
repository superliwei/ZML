CanvasEvent.prototype = new Event("CanvasEvent");

function CanvasEvent()
{
	
}

CanvasEvent.prototype.construct = function(_data)
{
	this.data = _data;
}