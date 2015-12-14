! function(canvas, Math) {
	"use strict";
	var spans = [],
		num = 12;
	var run = function() {
		requestAnimationFrame(run);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (var i = 0; i < num; i++) {
			var span = spans[i],
				x = (canvas.width / num) * i,
				w = (canvas.width - num) / num;
			span.y += span.acc;
			if (pointer.hasMoved > 0 && pointer.x >= x && pointer.x <= x + w && span.y > pointer.y) {
				span.acc = -50;
				span.d = 255;
			}
			if (span.y > canvas.height) {
				span.beep && span.acc > 2 && span.beep.play();
				span.acc = -Math.abs(span.acc * 0.8);
				span.y = canvas.height;
			}
			if (span.y < 0) span.acc = 1;
			span.acc += 1;
			ctx.fillStyle = "rgb(" + span.d + "," + (span.d || Math.round(span.y * 255 / canvas.height)) + "," + span.d + ")";
			span.d = 0;
			ctx.fillRect(x, 0, w, span.y);
		}
		pointer.hasMoved--;
	}
	var ctx = canvas.init();
	var pointer = canvas.pointer();
	pointer.move = pointer.down = function() {
		this.hasMoved = 3;
	}
	pointer.hasMoved = 0;
	for (var i = 0; i < num; i++) spans[i] = {
		y: -i * 5,
		acc: 1,
		d: 0,
		beep: window.location.href.indexOf("fullcpgrid") > -1 ? false : window.Audio ? new Audio("https://s3-us-west-2.amazonaws.com/s.cdpn.io/222599/pong" + (Math.floor(Math.random() * 3) + 1) + ".mp3") : false
	};
	run();
}(canvas, Math);
