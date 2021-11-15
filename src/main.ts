import "./style.css";
import Animate from "./animate";

class App {
  private animation: Animate;
  constructor(animation: Animate) {
    this.animation = animation;
  }

  public init() {
    this.animationLoop();
  }

  private animationLoop() {
    requestAnimationFrame(this.animationLoop.bind(this));
    this.animation.render();
  }
}

window.onload = function () {
  const app = new App(new Animate());
  app.init();
};
