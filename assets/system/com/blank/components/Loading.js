function Loading()
{
	this.width = 120;
	this.height = 12;
	this.view = $("<div>");
	this.view.css("width",this.width+"px");
	this.view.css("height",this.height+"px");
	this.view.css("border","solid 1px");
	this.view.css("position","absolute");
	this.view.css("border-radius","10px");
	this.view.css("color","#ffffff");

	this.bar = $("<div>");
	this.bar.css("left","1px");
	this.bar.css("top","1px");
	this.bar.css("width","0px");
	this.bar.css("height",(this.height-2)+"px");
	this.bar.css("background","#ffffff");
	this.bar.css("position","absolute");
	this.bar.css("border-radius","10px");
	this.bar.appendTo(this.view);

	this.info = $("<div>Loading - 0%</div>");
	this.info.css("position","absolute");
	this.info.css("font-size","12px");
	this.info.css("top","-16px");
	this.info.css("left","2px");
	this.info.appendTo(this.view);
}

Loading.prototype.progress = function(value)
{
	this.bar.css("width",118*value/100+"px");
	this.info.text("Loading - "+Math.round(value)+"%");
}