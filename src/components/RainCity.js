import { Howl } from "howler";

const RAIN_DROPS_NUMBER = 1500;
const ANGLE = -65 * (Math.PI / 180);

const rain = new Howl({
  src: ["sounds/rain-sound.mp3"],
  loop: true
});

class RainCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 20;
      }

      canvas {
        width: 100%;
        height: 100%;
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.canvas = this.shadowRoot.querySelector("canvas");
    this.init();
  }

  init() {
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.getComputedStyle(this).width.replace("px", "") * 2;
    this.canvas.height = window.getComputedStyle(this).height.replace("px", "") * 2;
    // rain.play();

    this.drops = [];
    for (let i = 0; i < RAIN_DROPS_NUMBER; i++) {
      const speed = Math.floor(Math.random() * 15) + 15;
      this.drops.push({
        x: Math.floor(Math.random() * this.canvas.width),
        y: Math.floor(Math.random() * this.canvas.height),
        color: `rgba(255, 255, 255, ${Math.random()})`,
        speed,
        size: 15,
      });
    }

    setInterval(() => this.loop(), 50);
  }

  update() {
    this.drops.forEach(drop => {
      drop.x += drop.speed * Math.cos(ANGLE);
      drop.y -= drop.speed * Math.sin(ANGLE);

      const isXOutside = drop.x > this.canvas.width;
      const isYOutside = drop.y > this.canvas.height;
      if (isXOutside) {
        drop.x = 0;
        drop.y = Math.floor(Math.random() * this.canvas.height);
      }
      if (isYOutside) {
        drop.y = 0;
        drop.x = Math.floor(Math.random() * this.canvas.width);
      }
    });
  }

  loop() {
    this.update();
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.drops.forEach(drop => {
      this.ctx.strokeStyle = drop.color;
      this.ctx.beginPath();
      this.ctx.moveTo(drop.x, drop.y);
      this.ctx.lineTo(drop.x + 5, drop.y + drop.size);
      this.ctx.stroke();
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${RainCity.styles}</style>
    <canvas ></canvas>
    `;
  }
}

customElements.define("rain-city", RainCity);
