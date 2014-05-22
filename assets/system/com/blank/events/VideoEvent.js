function VideoEvent(){}
VideoEvent.prototype = new Event("VideoEvent");
VideoEvent.prototype.construct = function(_data)
{
	this.data = _data;
}