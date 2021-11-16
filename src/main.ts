import "./style.css";
import Animate from "./animate";

class App {
  private animation: Animate;
  constructor(animation: Animate) {
    this.animation = animation;
  }

  public init() {
    //start animation loop
    this.animationLoop();
  }

  private animationLoop() {
    //function responsible making an infinite loop
    requestAnimationFrame(() => this.animationLoop());
    this.animation.render();
  }
}

window.onload = function () {
  const app = new App(new Animate());
  app.init();
};
