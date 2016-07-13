ZML.Transition = {};

ZML.Transition.None = function(manager,fromElem,toElem,onComplete)
{
	$(fromElem).hide();
	$(toElem).show();
	onComplete();
}

ZML.Transition.None.prototype.dispose = function()
{
	//do nothing...
}