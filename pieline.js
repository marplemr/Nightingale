function pieLine(data, canvas) {
	this.data = normalize(data);
	getDegrees(data);
	plotPie(data, canvas);
}

function normalize(data) {
	var maxval = data.reduce(function(a, b) {
	   return Math.max(a, b.value);
	}, 0);

	for (i = 0; i < data.length; i++)
		data[i].normalValue = data[i].value/maxval;
	
	return data;
}

function getDegrees(data) {
	var modulo = 360 % data.length;
	var degrees = Math.floor(360/data.length);

	for (i = 0; i < data.length; i++) {
		if (modulo <= 0) {
			data[i].degrees = degrees;
		} else {
			data[i].degrees = degrees + 1;
			modulo --;
		}
	}
}

function plotPie (data, canvas) {

	var width = canvas.width();
	var height = canvas.height();

	var center = [width/2, height/2];
	var maxRadius = (width < height) ? height/2 : width/2;


	var plot = canvas[0].getContext('2d');
	var segmentRadiants = Math.PI*2/data.length;

	for (i = 0; i < data.length; i++) {
		plot.fillStyle = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
		plot.beginPath();
		plot.moveTo(center[0],center[1]);
		plot.arc(center[0],center[1],maxRadius*data[i].normalValue,segmentRadiants*i,segmentRadiants*(i+1),false);
		plot.lineTo(center[0],center[1]);
		plot.fill();
	}


}
