import "./BuildingWindow.js";

const WINDOW_NUMBER = 40;
const COLORS = [
  "#333",
  "#3a3a3a",
  "#444",
  "#4a4a4a",
];

class BuildingCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --building-width: 100%;

        display: grid;
        grid-template-columns: repeat(2, 15px);
        grid-template-rows: repeat(auto-fill, 15px);
        justify-content: center;
        padding-top: 20px;
        gap: 15px;

        width: var(--building-width);
        height: var(--building-height);
        background-color: var(--building-color, #444);

        box-shadow: 0 0 25px 5px #0008;
      }
    `;
  }

  init() {
    const width = Math.floor(Math.random() * 25) + 50;
    const height = Math.floor(Math.random() * 50) + 50;
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    this.style.setProperty("--building-width", width + "%");
    this.style.setProperty("--building-height", height + "%");
    this.style.setProperty("--building-color", `${COLORS[colorIndex]}`);
  }

  get height() {
    return parseInt(this.style.getPropertyValue("height"));
  }

  connectedCallback() {
    this.init();
    this.render();
  }

  generateWindows() {
    return "<building-window></building-window>".repeat(WINDOW_NUMBER);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BuildingCity.styles}</style>
      ${this.generateWindows()}
    `;
  }
}

customElements.define("building-city", BuildingCity);
