class BuildingWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        background-color: var(--window-off-color);
        transition:
          background-color 0.5s ease,
          box-shadow 1s ease;
      }

      :host(.on) {
        background-color: var(--window-color);
        box-shadow: 0 0 10px var(--shine-color);
      }
    `;
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  turnOn() {
    this.classList.add("on");
  }

  turnOff() {
    this.classList.remove("on");
  }

  toggle() {
    this.classList.toggle("on");
    this.setEvent();
  }

  setEvent() {
    const ocurrences = Math.floor(Math.random() * 35);
    if (ocurrences !== 0) return;

    const time = Math.floor(Math.random() * 10000) + 2000;
    setTimeout(() => this.toggle(), time);
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${BuildingWindow.styles}</style>
`;
  }
}

customElements.define("building-window", BuildingWindow);
