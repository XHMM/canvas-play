/*
* usage:
*
* const ele = new ParticleElement({$element: $('..'), min:12, max:22});
* ele.on();
* // ele.off();
*
*
* */


const html2canvas = require("html2canvas")
const __canvasId = '__particleElementCanvas';

class Particle {
  private __x: number;
  private __y: number;
  private __rgba: [number, number, number, number];
  private __radius: number;
  private __life: number;
  private __remainingLife: number;
  private __speed: {x:number,y:number}
  constructor(x:number,y:number, rgba:[number,number,number,number]) {
    this.__x = x;
    this.__y = y;
    this.__rgba = rgba;
    this.__radius = 5 + Math.random()*5;
    this.__life = 30 + Math.random() * 10; // 总存活时长
    this.__remainingLife = this.__life; // 剩余存活时长
    this.__speed = {
      x: -5 + Math.random() * 10,
      y: -5 + Math.random() * 10
    }
  }
  draw = (ctx:CanvasRenderingContext2D)=>{
    if(this.__remainingLife>0 && this.__radius>0) {
      ctx.beginPath();
      ctx.arc(this.__x, this.__y, this.__radius, 0, Math.PI *2);
      ctx.fillStyle = `rgba(${this.__rgba[0]},${this.__rgba[1]},${this.__rgba[2]}, ${this.__rgba[3]})`;
      ctx.fill();
      this.__remainingLife--;
      this.__radius-=0.25;
      this.__x += this.__speed.x;
      this.__y += this.__speed.y;
    }
  }
  isDead = () =>{
    return this.__remainingLife<0|| this.__radius<0;
  }
}
class Lib {
  private __min: number;
  private __max: number;
  private __$element: HTMLElement;
  private __particles: Particle[] = [];
  private __particlesCtx:CanvasRenderingContext2D;
  private __animationId: number
  private __canAnimate=false; // html2canvas是异步的

  constructor({min=3, max=7, $element}) {
    console.log('[ParticleElement] 目前仅支持同页面一个元素哦！')
    min = +min || 3;
    max = +max || 7;
    this.__min = Math.min(min,max);
    this.__max = Math.max(min,max);
    this.__$element = $element;
    if($element instanceof Element) {
      html2canvas($element).then($elemCanvas => {
        this.__canAnimate = true;
        const $particlesCanvas = $('#'+__canvasId) as HTMLCanvasElement;
        this.__particlesCtx = $particlesCanvas ? $particlesCanvas.getContext('2d') : createParticlesCanvas();
        const elemCtx = $elemCanvas.getContext('2d');
        $element.addEventListener('click', (e:MouseEvent) => {
          const {clientX, clientY, offsetY, offsetX} = e;
          const rgba = elemCtx.getImageData(offsetX,offsetY,1,1).data;
          const count = Math.floor(this.__min+ Math.random()*(this.__max - this.__min));
          for(let i=0;i<count;i++)
            this.__particles.push(new Particle(clientX,clientY,rgba));
        })
      });
    }
    else
      throw new Error('[ParticleElement] Invalid constructor parameter: $element');
  }
  on = () => {
    const update = () =>{
      if(this.__canAnimate) { // html2canvas是异步的
        this.__particlesCtx.clearRect(0,0,window.innerWidth,window.innerHeight);
        for (let i = 0; i < this.__particles.length; i++) {
          const particle = this.__particles[i];
          particle.draw(this.__particlesCtx);
        }
        this.__particles = this.__particles.filter(p => !p.isDead());
      }
      this.__animationId = window.requestAnimationFrame(update);
    }
    this.__animationId =  window.requestAnimationFrame(update)
  }
  off = () => {
    if(this.__animationId) {
      window.cancelAnimationFrame(this.__animationId);
    }
  }
}
function createParticlesCanvas():CanvasRenderingContext2D {
  const $canvas:HTMLCanvasElement = window.document.createElement('canvas');
  $canvas.setAttribute('id', __canvasId);
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
  $canvas.style.position = "absolute";
  $canvas.style.top = "0";
  $canvas.style.left = "0";
  $canvas.style.zIndex = "1001";
  $canvas.style.pointerEvents = "none";
  document.body.appendChild($canvas);
  return $canvas.getContext('2d')
}
function $(selector: string) {
  return document.querySelector(selector);
}

export default Lib