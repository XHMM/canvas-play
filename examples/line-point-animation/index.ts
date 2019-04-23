import { rdom } from "dom-crud";

interface DotConstructorParameters {
  canvas: HTMLCanvasElement;
  x: number;
  y: number;
  radius?: number;
  fillColor?: string;
}
class Dot {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  public y: number;
  public x: number;
  public radius :number;
  public fillColor = "rgb(211,211,211)";
  private dx: number;
  private dy: number;

  private static lineThreshold = 131;
  constructor({
    canvas,
    x,
    y
  }: DotConstructorParameters) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.fillStyle = this.fillColor;
    this.radius = range(1,4);
    this.dx = range(-0.01, 0.01);
    this.dy = range(-0.01, 0.01);
  }
  draw() {
    this.ctx.fillStyle = this.fillColor;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.closePath();
  }
  // 需要运动的点，则在draw后需要接着调用该方法
  animate() {
    this.x = this.x + this.dx;
    this.y = this.y + this.dy;
    if ((this.x+this.radius) >= this.canvas.width || (this.x+this.radius) <= 0) this.dx = -this.dx;
    if ((this.y+this.radius) >= this.canvas.height || (this.y+this.radius) <= 0) this.dy = -this.dy;
  }
  update(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  connect(dot: Dot): void {
    const dis = Math.sqrt(
      Math.pow(this.x - dot.x, 2) + Math.pow(this.y - dot.y, 2)
    );
    if (dis <= Dot.lineThreshold) {
      this.ctx.beginPath();
      this.ctx.strokeStyle = `rgba(211,211,211, ${1 - dis / Dot.lineThreshold})`;
      this.ctx.moveTo(this.x, this.y);
      this.ctx.lineTo(dot.x, dot.y);
      this.ctx.stroke();
      this.ctx.closePath();
    }
  }
}
const $canvas = rdom<HTMLCanvasElement>("canvas")!;
const ctx = $canvas.getContext("2d")!;

let mouseDot = new Dot({ canvas: $canvas, x: -100, y: -100 });
$canvas.addEventListener("mousemove", ev => {
  mouseDot.update(ev.offsetX, ev.offsetY);
});
$canvas.addEventListener("mouseleave", ev => {
  mouseDot.update(-100,-100);
});
const dots: Dot[] = new Array(20).fill(0).map(item => {
  return new Dot({
    canvas: $canvas,
    x: range(10, 380),
    y: range(10, 380),
    radius: range(3, 8)
  });
});
dots.push(mouseDot);

function start() {
  ctx.clearRect(0, 0, 400, 400);

  mouseDot.draw();
  dots.map(item => {
    item.draw();
    item !== mouseDot && item.animate();
  });
  for (let i = 0; i < dots.length - 1; i++) {
    const dot1 = dots[i];
    for (let j = i + 1; j < dots.length; j++) {
      const dot2 = dots[j];
      dot1.connect(dot2);
    }
  }
  requestAnimationFrame(start);
}

start();

function range(min: number, max: number) {
  return Math.random() * (max - min + 1) + min;
}
