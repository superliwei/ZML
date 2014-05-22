Transition.None = function(manager,fromElem,toElem,onComplete)
{
	$(fromElem).detach();
	$(toElem).prependTo(manager.controller.view);
	onComplete();
}

Transition.None.prototype.dispose = function()
{
	//do nothing...
}