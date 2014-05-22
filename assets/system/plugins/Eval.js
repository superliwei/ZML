function Eval(){}

Eval.prototype = new Event("EvalEvent");

Eval.prototype.construct = function(_data)
{
	this.data = _data;
}

Eval.init = function()
{
	BroadcastCenter.addEventListener(Eval.prototype.type,function(event,data){
		var str = $(data).text();
		eval(str);
	});
}

FactoryMap["EVAL"] = Eval;
Eval.init();