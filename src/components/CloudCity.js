class CloudCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        display: inline-block;
        width: var(--width);
        height: var(--height);
        border-radius: 50px;
        opacity: var(--opacity);
        background-color: #fff;
        position: absolute;
        left: var(--x);
        top: var(--y);
        filter: blur(0.5px);
        animation: move-cloud var(--speed-cloud) linear infinite;
      }

      :host::before {
        content: "";
        display: inline-block;
        width: 40%;
        height: 50%;
        background: #fff;
        border-radius: 50%;
        transform: translate(50%, -50%);
      }

      :host::after {
        content: "";
        display: inline-block;
        width: 40%;
        height: 70%;
        background: #fff;
        border-radius: 50%;
        transform: translate(20%, -50%);
        position: absolute;
        top: 0;
        right: 25px;
      }

      @keyframes move-cloud {
        to {
          transform: translateX(400%);
        }
      }
    `;
  }

  move() {
    setInterval(() => {
      this.x = this.x >= 600 ? 0 : this.x + 1;
    }, 50);
  }

  setItem(propName, initialValue, randomValue, unit = "", multipy = 1) {
    const value = multipy * Math.floor(Math.random() * randomValue) + initialValue;
    this.style.setProperty(propName, `${value}${unit}`);
  }

  connectedCallback() {
    this.render();
    // this.move();

    this.setItem("--width", 100, 50, "px");
    this.setItem("--height", 30, 50, "px");
    this.setItem("--x", 0, 600, "px", -1);
    this.setItem("--y", 0, 300, "px");

    const opacity = Math.floor(Math.random() * 5 / 10) + 0.5;
    this.style.setProperty("--opacity", opacity);

    this.setItem("--speed-cloud", 20, 20, "s");
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${CloudCity.styles}</style>
    <div class="container">
      
    </div>`;
  }
}

customElements.define("cloud-city", CloudCity);
