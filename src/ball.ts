interface startPosition {
  X: number;
  Y: number;
}

class Ball {
  private posX: number;
  private posY: number;
  private velocityX: number;
  private velocityY: number;
  private gravity: number;
  private canvas: HTMLCanvasElement;
  private color: string;
  //values which determine the bouncing behaviour
  //could be change to achieve specific behaviour
  private radius: number = 30;
  private friction: number = 0.88;
  private bounce: number = 0.75;

  constructor(
    positions: startPosition,
    canvas: HTMLCanvasElement,
    gravity: number
  ) {
    //Initialize ball with its properties
    //1. Starting position - base on mouse click coordinate
    //2. Velocity x and y direction - random number and to make sure its not zero
    //3. Random color of the ball
    this.canvas = canvas;
    this.posX = positions.X;
    this.posY = positions.Y;
    this.velocityX =
      (Math.floor(Math.random() * 2) || -1) * (Math.random() * 8);
    this.velocityY =
      (Math.floor(Math.random() * 2) || -2) * (Math.random() * 8);
    this.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    this.gravity = gravity;
  }

  public render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
    ctx.closePath();
  }

  public update() {
    this.checkScreenBorderCollision();
    //creates the gravity effect, pulling the ball to he ground
    this.velocityY += this.gravity;
    this.posX += this.velocityX;
    this.posY += this.velocityY;
  }

  private checkScreenBorderCollision() {
    const ballBottomBound = this.posY + this.radius;
    const ballTopBound = this.posY - this.radius;
    const ballRightBound = this.posX + this.radius;
    const ballLeftBound = this.posX - this.radius;

    //Check collision to the bottom of screen
    if (ballBottomBound >= this.canvas.height) {
      //creates the bounce effect
      this.velocityY *= -this.bounce;
      this.posY = this.canvas.height - this.radius;
      //reduce the ball velocity
      this.velocityX *= this.friction;
    }

    //Check collision to the top of screen
    if (ballTopBound <= 0) {
      this.velocityY *= -this.bounce;
      this.posY = this.radius;
      this.velocityX *= this.friction;
    }

    //Check collision to the right of screen
    if (ballRightBound >= this.canvas.width) {
      this.velocityX *= -this.bounce;
      this.posX = this.canvas.width - this.radius;
    }

    //Check collision to the left of screen
    if (ballLeftBound <= 0) {
      this.velocityX *= -this.bounce;
      this.posX = this.radius;
    }
  }
}

export default Ball;
