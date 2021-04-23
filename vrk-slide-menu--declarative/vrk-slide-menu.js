class VrkSlideMenu extends HTMLElement {
  constructor() {
    super();
    // Shadow root
    this._root = this.shadowRoot;
    // Privars
    this._open = false;
  }
  connectedCallback() {
    // Elements cache
    this._$frame = this._root.querySelector(".frame");
    // Events
    this._$frame.addEventListener("click", (event) => {
      if (event.target.dataset.action === "close") {
        this.open = false;
      }
    });
    // Render
    this._render();
  }
  _render() {
    if (this._$frame !== null) {
      if (this._open) {
        this._$frame.classList.add("open");
        this.dispatchEvent(new CustomEvent("vrk-slide-menu::opened"));
      } else {
        this._$frame.classList.remove("open");
        this.dispatchEvent(new CustomEvent("vrk-slide-menu::closed"));
      }
    }
  }
  set open(value) {
    const booleanValue = value === true;
    if (this._open === booleanValue) return;
    this._open = booleanValue;
    this._render();
  }
  get open() {
    return this._open;
  }
  static get observedAttributes() {
    return ["open"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "open":
        break;
    }
  }
}

window.customElements.define("vrk-slide-menu", VrkSlideMenu);
