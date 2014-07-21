
var balls={};

var Ball=function(ballRef,svgElement) {
	this.svg=svgElement;
	this.el=document.createElementNS("http://www.w3.org/2000/svg", 'g');
	this.el.setAttribute("class","ball");

	this.circle=document.createElementNS("http://www.w3.org/2000/svg", 'circle');
	this.el.appendChild(this.circle);
	
	this.label=document.createElementNS("http://www.w3.org/2000/svg", 'text');
	this.label.setAttribute("class","svgHidden");
	this.el.appendChild(this.label);
	
	this.svg.append(this.el);

	
	this.ballResource=ballRef;

	var watchRequest={
		dst: "keyValue.api",
		action: "watch",
		resource: ballRef
	};
	var self=this;
	var packet=client.send(watchRequest,function(packet) {
		if(packet.action==="changed") {
			self.draw(packet.entity.newValue);
			self.label.textContent=packet.resource;
		}
	});
	
	$(this.el).click(function() {
		if(self.label.getAttribute("class").match("svgHidden")) {
			self.label.setAttribute("class","");
		}else {
			self.label.setAttribute("class","svgHidden");
		}
	});	
	this.watchId=packet.msgId;	
};

Ball.prototype.draw=function(info) {
	if(!info) {
		this.remove();
	}
	
	this.el.setAttribute("transform","translate(" + info.x +","+ info.y + ")");
//	this.el.setAttribute("y",info.y);
	this.circle.setAttribute("r",info.r);
  this.circle.setAttribute("fill",info.color);
	this.label.setAttribute("x",info.r  + 5);
};

Ball.prototype.remove=function() {
	client.send({
		dst: "keyValue.api",
		action: "unwatch",
		replyTo: this.watchId
	});
	this.el.remove();
	delete balls[this.ballResource];
};