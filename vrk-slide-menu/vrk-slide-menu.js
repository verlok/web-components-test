class VrkSlideMenu extends HTMLElement {
  constructor() {
    super();
    // Shadow root
    this._root = this.attachShadow({ mode: "open" });
    // Elements
    this._$ = null;
    this._$ = null;
    // Privars
    this._open = false;
  }
  connectedCallback() {
    // HTML & CSS
    this._root.innerHTML = /*html*/ `
      <style>
        :host {
          
        }
        .frame {
          position: fixed;
          top: 0; bottom: 0;
          left: 0; right: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 10;
          transition: background-color 300ms ease-in;
        }
        .frame.open {
          pointer-events: auto;
          background-color: rgba(0, 0, 0, 0.25);
        }
        .container {
          width: 80%;
          max-width: 400px; background: #FFF;
          height: 100%;
          transform: translateX(-100%);
          will-change: transform;
          transition: transform 300ms ease-in;
          box-shadow: 1px 0 3px rgba(51,51,51,.25);
        }
        .frame.open .container {
          transform: none;
        }
        .title {
          display: flex;
          min-height: 3.2em;
          font-size: 1.5em;
          background-color: #f1f1f1;
          color: #666;
        }
        .title-content {
          flex-grow: 1;
          display: flex;
          align-items: center;
          padding-left: 1em;
        }
        .close {
          font-size: 100px;
          flex-basis: 100px;
          flex-grow: 0;
          flex-shrink: 0;
          font-size: 1rem;
          background: transparent;
          border: 0;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      <div class="frame">
        <div class="container">
          <div class="title">
            <div class="title-content">
              Menu
            </div>
            <button type="button" class="close">Close</button>
          </div>
          <nav class="Content">
            <a href="#/item/1">Menu item one</a>
          </nav>
        </div>
      </div>
    `;
    // Elements cache
    this._$ = this._root.querySelector(".");
    this._$ = this._root.querySelector(".");

    this._render();
  }
  _render() {
    if (true) {
    }
  }
  set theme(value) {
    this._render();
  }
  get theme() {}
  static get observedAttributes() {
    return ["theme"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "theme":
        break;
    }
  }
}

window.customElements.define("vrk-slide-menu", VrkSlideMenu);
