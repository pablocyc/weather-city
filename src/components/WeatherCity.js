import "./BuildingCity.js";
import "./CloudCity.js";
import "./RainCity.js";

const DAY_MOMENT = [
  "dawn", "day", "sunset", "night"
];
const BUILDINGS_NUMBER = 6;
const CLOUDS_NUMBER = 8;
const TIME_TO_CHANGE_STATE = 7000;

class WeatherCity extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.currentMoment = 1;
  }

  static get styles() {
    return /* css */`
      :host {
        --sky-dawn-color: #aa5f92;
        --sky-day-color: #1588b6;
        --sky-sunset-color: #845720;
        --sky-night-color: #0f0c20;
      }

      .container {
        overflow: hidden;
        width: 100%;
        height: 75%;

        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        transition: background 1.5s;
        position: relative;
      }

      :host(.day) .container {
        background-color: var(--sky-day-color);
        --window-off-color: #fef8;
        --window-color: #fef8;
        --shine-color: transparent;
      }
      :host(.night) .container {
        background-color: var(--sky-night-color);
        --window-off-color: #000;
        --window-color: gold;
        --shine-color: #d3a50f;
      }
      :host(.dawn) .container {
        background-color: var(--sky-dawn-color);
        --window-off-color: #fef8;
        --window-color: #fef8;
        --shine-color: transparent;
      }
      :host(.sunset) .container {
        background-color: var(--sky-sunset-color);
        --window-off-color: #000;
        --window-color: gold;
        --shine-color: #d3a50f;
      }

      .sun,
      .moon {
        width: var(--size);
        height: var(--size);
        border-radius: 50%;
        position: absolute;
        top: 20px;
        transition: transform 3.5s ease-in-out;
        z-index: 2;
      }

      .sun {
        --size: 80px;
        background-color: #e0a911;
        box-shadow: 0 0 25px 12px #e0a911;
        left: 20px;
      }

      .moon {
        --size: 50px;
        background-color: #fff;
        box-shadow: 0 0 10px 5px #fff8;
        right: 20px;
        background-image:
          radial-gradient(circle 25px at 25% 25%, #eee 0 25%, transparent 28%),
          radial-gradient(circle 30px at 75% 55%, #ddd 0 25%, transparent 32%),
          radial-gradient(circle 15px at 55% 75%, #eee 0 25%, transparent 32%);
      }

      :host(.night) .moon,
      :host(.sunset) .moon,
      :host(.day) .sun,
      :host(.dawn) .sun {
        transform: translate(0, 0);
      }
      :host(.night) .sun,
      :host(.sunset) .sun,
      :host(.day) .moon,
      :host(.dawn) .moon {
        transform: translate(0, 500px);
      }

      .buildings {
        width: 100%;
        height: 75%;

        display: flex;
        align-items: flex-end;

        position: relative;
        z-index: 10;
      }

      .clouds {
        width: 100%;
        height: 250px;
        position: absolute;
        top: 0;
        z-index: 5;
      }
    `;
  }

  connectedCallback() {
    this.render();
    setInterval(() => { this.changeState(); }, TIME_TO_CHANGE_STATE);
  }

  generateBuildings() {
    return "<building-city></building-city>".repeat(BUILDINGS_NUMBER);
  }

  changeState() {
    this.classList.remove(DAY_MOMENT[this.currentMoment]);
    this.currentMoment = (this.currentMoment + 1) % DAY_MOMENT.length;
    this.classList.add(DAY_MOMENT[this.currentMoment]);

    const event = new CustomEvent("DAY_MOMENT_CHANGED", {
      detail: DAY_MOMENT[this.currentMoment],
      bubbles: true,
      composed: true
    });
    this.dispatchEvent(event);
  }

  generateClouds() {
    return "<cloud-city></cloud-city>".repeat(CLOUDS_NUMBER);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${WeatherCity.styles}</style>
    <div class="container">
      <rain-city></rain-city>
      <div class="sun"></div>
      <div class="moon"></div>
      <div class="clouds">
        ${this.generateClouds()}
      </div>
      <div class="buildings">
        ${this.generateBuildings()}
      </div>
    </div>`;
  }
}

customElements.define("weather-city", WeatherCity);
