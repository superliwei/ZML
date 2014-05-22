BasicComponent.prototype = new BasicCanvas();

function BasicComponent()
{
	this.view = this.view.clone();
	this.url = null;
}

BasicComponent.prototype.constructComplete = function()
{
	var self = this;
	this.url = CoreURL.app+this.data.attr("url");
	$.get(this.url,function(data){
		self.constructChildren(data);
	},"text");
}

BasicComponent.prototype.constructChildren = function(_xml)
{
	var self = this;
	var nodeData = $(_xml).last();
	var nodeName = nodeData.prop("nodeName").toUpperCase();
	var Class = FactoryMap[nodeName];
	var node = new Class();
	node.view.bind(BasicCanvas.CONSTRUCT_COMPLETE,function(){
		self.childrenConstructComplete();
	});
	node.construct(nodeData);
	node.view.prependTo(self.view);
}

BasicComponent.prototype.childrenConstructComplete = function()
{
	BasicCanvas.prototype.constructComplete.call(this);
}