MovieClipEvent.prototype = new Event("MovieClipEvent");

function MovieClipEvent()
{

}

MovieClipEvent.prototype.construct = function(_data)
{
	this.data = _data;
}