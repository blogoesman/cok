initPixi(0x336699);

var prevBox = new PIXI.Graphics();
var box = new PIXI.Graphics();
stage.addChild(prevBox);
stage.addChild(box);
animate();
var x  = 0;
var y = 0;

var fps = 4;
var frame = 0;
function animate() {
  requestAnimationFrame(animate);
  frame++;
  if (frame%fps == 0) {
    if (frame/fps > 250) {
      prevBox.clear();
      var temp = prevBox;
      prevBox = box;
      box = temp;
      frame = 0;
      stage.addChild(prevBox);
      stage.addChild(box);
    }
    box.lineStyle(30 - 0.1 * frame/fps, Math.random() * 0xFFFFFF);
    box.moveTo(-50, Math.random() * sH);
    var px1 = -100 + Math.random()*(sW + 200);
    var py1 = Math.random() * (sH * 2)  - sH/2;
    var px2 = -100 + Math.random()*(sW + 200);
    var py2 = Math.random() * (sH * 2)  - sH/2;
    box.bezierCurveTo(px1, py1, px2, py2, sW + 50, Math.random() * sH)
    box.endFill();
  }
  // render the container
  renderer.render(stage);
}
