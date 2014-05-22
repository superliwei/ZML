BasicCanvas.prototype._scaleX = 1;
BasicCanvas.prototype._scaleY = 1;
BasicCanvas.prototype._rotate = 0;

BasicCanvas.prototype.scaleX = function(value)
{
	this._scaleX = value;
	this.updateTransform();
}

BasicCanvas.prototype.scaleY = function(value)
{
	this._scaleY = value;
	this.updateTransform();
}

BasicCanvas.prototype.rotate = function(value)
{
	this._rotate = value;
	this.updateTransform();
}

BasicCanvas.prototype.updateTransform = function()
{
	var trans = "";
	trans+="rotate("+this._rotate+"deg)";
	trans+=" ";
	trans+= "scale("+this._scaleX+","+this._scaleY+")";
	this.view.css("transform-origin","0 0");
	this.view.css("-webkit-transform",trans);
	this.view.css("-moz-transform",trans);
	this.view.css("-ms-transform",trans);
}