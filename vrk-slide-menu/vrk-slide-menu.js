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
          align-items: center;
          font-size: 1.3rem;
          background-color: #f1f1f1;
          padding: 0 1rem;
          color: #666;
        }
        .title-content {
          flex-grow: 1;
          display: flex;
          align-items: center;
          
        }
        .close {
          flex-basis: 5em;
          flex-grow: 0;
          flex-shrink: 0;
          font-size: 1rem;
          /*background: transparent;
          border: 0;*/
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          /*padding: 0.5rem 0.25rem;*/
        }
        .content-slot::slotted(a) {
          display: block;
          font-size: 1.2rem;
          text-decoration: none;
          line-height: 2.5em;
          padding: 0.5rem 1rem;
          border-bottom: 1px solid #f1f1f1;
          color: #666;
        }
        .content-slot::slotted(a:hover) {
          color: #000;
        }
        /* THEMES */
        :host([theme="red"]) .content-slot::slotted(a:hover) { 
          color: #E23F24;
        }
        :host([theme="red"]) .title {
          background: #E23F24;
          color: white;
        }
        :host([theme="blue"]) .content-slot::slotted(a:hover) { 
          color: #0D152D;
        }
        :host([theme="blue"]) .title {
          background: #0D152D;
          color: white;
        }
        :host([theme="red"]) .close {
          color: white;
        }
        :host([theme="blue"]) .close {
          color: white;
        }
        :host([backdrop="false"]) .frame.open {
          pointer-events: none; 
          background-color: inherit;
        }
        :host([backdrop="false"]) .frame.open .container {
          pointer-events: auto;
        }
      </style>
      <div class="frame" data-action="close">
        <div class="container">
          <div class="title">
            <div class="title-content">
              <slot name="title">Menu</slot>
            </div>
            <button type="button" class="close" data-action="close">Close</button>
          </div>
          <nav class="Content">
            <slot class="content-slot"></slot>
          </nav>
        </div>
      </div>
    `;
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
