var BroadcastCenter = {};

BroadcastCenter.dispatchEvent = function(e)
{
	$(document).trigger(e.type,e.data);
}

BroadcastCenter.addEventListener = function(eventName,eventHandler)
{
	$(document).bind(eventName,eventHandler)
}

BroadcastCenter.sendEvent = function(eventStr)
{
	var list = $(eventStr).children();
	var len = list.length;
	for(var i=0;i<len;i++)
	{
		var nodeName = list[i].nodeName;
		if(nodeName == "EVENTS")
		{
			var src = $(list[i]).attr("src");
			var evts = Events.getEventsById(src);
			BroadcastCenter.sendEvent(evts.data.prop("outerHTML"));
		}
		else
		{
			var Class = FactoryMap[nodeName];
			if(Class!=undefined)
			{
				var e = new Class();
				e.construct($(list[i]));
				BroadcastCenter.dispatchEvent(e);
			}
		}
	}
}