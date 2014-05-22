Transition.Random = function(manager,fromElem,toElem,onComplete)
{
	var arr = [];
	for(var i in TransitionMap)
	{
		if(i!="none" && i!="random")
		{
			arr.push(TransitionMap[i]);
		}
	}
	var idx = Math.round(Math.random()*(arr.length-1));
	var Class = arr[idx];
	this.effect = new Class(manager,fromElem,toElem,onComplete);
}

Transition.Random.prototype.dispose = function()
{
	if(this.effect)
	{
		this.effect.dispose();
		this.effect = null;
	}
}

TransitionMap["random"] = Transition.Random;