import Ball from "./ball";

class Animate {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private height: number = window.innerHeight - 100;
  private width: number = window.innerWidth - 50;
  private gravity: number = 0.25;
  private balls: Ball[] = [];

  constructor() {
    this.canvas = this.createCanvas();
    this.canvas.height = this.height;
    this.canvas.width = this.width;
    this.ctx = this.canvas.getContext("2d");
  }

  private createCanvas() {
    const canvas = document.createElement("canvas");
    canvas.setAttribute("id", "canvas");
    canvas.onclick = this.handleClickCanvas.bind(this);
    document.body.appendChild(canvas);

    return canvas;
  }

  private handleClickCanvas(event: MouseEvent) {
    const ball = new Ball(
      { X: event.offsetX, Y: event.offsetY },
      this.canvas,
      this.gravity
    );
    this.balls.push(ball);
  }

  public render() {
    //The basic concept of animation
    //1. Clear canvas
    //2. Update object
    //3. Render object
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.balls.forEach((ball) => ball.update());
    this.balls.forEach((ball) => ball.render(this.ctx));
  }
}

export default Animate;
