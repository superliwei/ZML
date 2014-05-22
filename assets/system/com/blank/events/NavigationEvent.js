NavigationEvent.prototype = new Event("NavigationEvent");

function NavigationEvent()
{

}

NavigationEvent.prototype.construct = function(_data)
{
	this.data = _data;
}