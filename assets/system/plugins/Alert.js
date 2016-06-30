ZML.Alert = (function(){
	
	Alert.prototype = new ZML.Event("Alert");

	function Alert(){}
	
	Alert.prototype.construct = function(_data)
	{
		this.data = _data;
	}
	
	Alert.init = function()
	{
		ZML.BroadcastCenter.addEventListener(Alert.prototype.type,function(event,data){
			if($(data).attr("msg")!=undefined)
			{
				alert($(data).attr("msg"));
			}
			else if($(data).attr("prop")!=undefined)
			{
				alert($("#"+$(data).attr("id")).prop($(data).attr("prop")));
			}
			else if($(data).attr("attr")!=undefined)
			{
				var str = $("#"+$(data).attr("id")).attr($(data).attr("attr"));
				str = (str==undefined)?$("#"+$(data).attr("id")).css($(data).attr("attr")):str;
				alert(str);
			}
		});
	}
	
	ZML.FactoryMap["ALERT"] = Alert;
	Alert.init();
	return Alert;
	
})();