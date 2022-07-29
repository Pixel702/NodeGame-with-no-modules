function line(pos1, pos2) {
	var coordinatesArray = new Array();

	var x1 = pos1.x;
	var y1 = pos1.y;
	var x2 = pos2.x;
	var y2 = pos2.y;

	var dx = Math.abs(x2 - x1);
	var dy = Math.abs(y2 - y1);
	var sx = (x1 < x2) ? 1 : -1;
	var sy = (y1 < y2) ? 1 : -1;
	var err = dx - dy;

	coordinatesArray.push({
		x: x1,
		y: y1
	});

	while (!((x1 == x2) && (y1 == y2))) {
		var e2 = err << 1;
		if (e2 > -dy) {
			err -= dy;
			x1 += sx;
		};

		if (e2 < dx) {
			err += dx;
			y1 += sy;
		};

		coordinatesArray.push({
			x: x1,
			y: y1
		});
	};

	return coordinatesArray;
};

module.exports = {
	line
};