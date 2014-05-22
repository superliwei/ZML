ImageButton.prototype = new ImageCanvas();

function ImageButton()
{
	this.view = this.view.clone();
}

ImageButton.prototype.constructComplete = function()
{
	ImageButton.prototype.clickHandler = Button.prototype.clickHandler;
	ImageButton.prototype.bindEvents = Button.prototype.bindEvents;
	ImageButton.prototype.effect = Button.prototype.effect;
	ImageButton.prototype.enabled = Button.prototype.enabled;
	ImageButton.prototype.unbindEvents = Button.prototype.unbindEvents;
	Button.prototype.init.call(this);
	Button.prototype.initSelfEvents.call(this);
	ImageCanvas.prototype.constructComplete.call(this);
}