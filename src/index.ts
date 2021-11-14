import "./style.css";
import animate from "./print";

function component() {
  const element = document.createElement("div");
  element.append("Ball animation");
  element.classList.add("animation");

  animate();

  return element;
}

document.body.appendChild(component());
