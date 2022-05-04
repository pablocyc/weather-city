import "./WeatherCity.js";

class WeatherCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        --width: 450px;
        --height: 650px;
      }

      .container {
        width: var(--width);
        height: var(--height);
        background-color: #fff;
        box-shadow: 0 0 25px 5px #0008;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${WeatherCard.styles}</style>
    <div class="container">
      <weather-city class="day"></weather-city>
    </div>`;
  }
}

customElements.define("weather-card", WeatherCard);
